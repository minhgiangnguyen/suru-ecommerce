import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";
import * as ExcelJS from "exceljs";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    customer: { name: string; phone: string; address: string };
    productId: number;
    purchaseOption: string;
    totalPrice: number;
  }) {
    // tạo customer mới
    const customer = await this.prisma.customer.create({
      data: data.customer,
    });

    // tạo order gắn với customer
    return this.prisma.order.create({
      data: {
        customerId: customer.id,
        productId: data.productId,
        totalPrice: data.totalPrice,
        purchaseOption: data.purchaseOption || null,
        receiveStatus: "pending",
        transferStatus: "pending",
      },
    });
  }

  list() {
    return this.prisma.order.findMany({
      include: { customer: true, product: true },
      orderBy: { createdAt: "desc" },
    });
  }

  updateStatus(
    id: number,
    data: { receiveStatus?: string; transferStatus?: string }
  ) {
    return this.prisma.order.update({ where: { id }, data });
  }

  async exportOrders(): Promise<ArrayBuffer> {
    const orders = await this.prisma.order.findMany({
      where: { transferStatus: "pending" },
      include: { customer: true, product: true },
    });

    if (!orders.length) {
      throw new Error("Không có đơn hàng nào pending");
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pending Orders");

    // ========== Header thiết kế ==========
    // Merge và đặt tiêu đề nhóm
    worksheet.mergeCells("A1", "E1");
    worksheet.getCell("A1").value = "Thông tin người nhận";
    worksheet.mergeCells("F1", "F1");
    worksheet.getCell("F1").value = "Dịch vụ vận chuyển";
    worksheet.mergeCells("G1", "G1");
    worksheet.getCell("G1").value = "Hình thức lấy hàng";
    worksheet.mergeCells("H1", "H1");
    worksheet.getCell("H1").value = "Phương thức thanh toán Ship";
    worksheet.mergeCells("I1", "S1");
    worksheet.getCell("I1").value = "Hàng hóa";

    // Row 2: header từng cột
    const headers = [
      "STT",
      "Tên người nhận (*)",
      "Số điện thoại (*)",
      "Địa chỉ chi tiết (*)",
      "Mã đơn hàng riêng",
      "Loại dịch vụ (*)",
      "Gửi tại bưu cục",
      "Phương thức thanh toán (*)",
      "Tên sản phẩm (*)",
      "Loại hàng (*)",
      "Trọng lượng (kg) (*)",
      "Chiều dài (cm)",
      "Chiều rộng (cm)",
      "Chiều cao (cm)",
      "Số kiện (*)",
      "Tiền thu hộ COD (VND)",
      "Giá trị hàng hóa (Phí khai giá)",
      "Giao 1 phần",
      "Ghi chú",
    ];
    worksheet.addRow(headers);

    // Row 3: số thứ tự cột (1,2,3,...)
    const colNumbers = headers.map((_, i) => i + 1);
    worksheet.addRow(colNumbers);

    // Style cho row 1 + 2
    [1, 2].forEach((rowNumber) => {
      const row = worksheet.getRow(rowNumber);
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "2E75B5" }, // xanh lam
        };
        cell.font = { bold: true, color: { argb: "FFFFFF" } }; // chữ trắng
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Style cho row 3
    const row3 = worksheet.getRow(3);
    row3.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2E75B5" }, // xanh lam
      };
      cell.font = { bold: true, color: { argb: "FFD966" } }; // chữ vàng
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Set width cho cột
    const colWidths = [
      6, 25, 20, 40, 20, 15, 12, 20, 25, 15, 12, 12, 12, 12, 10, 18, 20, 12, 15,
    ];
    colWidths.forEach((w, i) => (worksheet.getColumn(i + 1).width = w));

    // ========== Rows dữ liệu ==========
    orders.forEach((order, index) => {
      const row = worksheet.addRow([
        index + 1, // STT
        order.customer.name,
        order.customer.phone,
        order.customer.address,
        "", // mã đơn hàng riêng
        "EXPRESS", // dịch vụ
        "Không", // gửi tại bưu cục
        "CC_CASH", // phương thức thanh toán
        order.purchaseOption, // tên sản phẩm
        order.product.name, // loại hàng
        "", // trọng lượng
        "", // dài
        "", // rộng
        "", // cao
        1, // số kiện
        order.totalPrice, // COD
        order.totalPrice, // Giá trị hàng hóa
        "không", // Giao 1 phần
        "", // Ghi chú
      ]);

      // 👉 Format cột tiền tệ (cột 16 và 17)
      row.getCell(16).numFmt = "#,##0 [$VND]"; // hiển thị 1,000,000 VND
      row.getCell(17).numFmt = "#,##0 [$VND]";
    });

    // Style cho toàn bộ data
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 3) {
        row.eachCell((cell) => {
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Xuất buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Update status sau khi export
    await this.prisma.order.updateMany({
      where: { id: { in: orders.map((o) => o.id) } },
      data: { transferStatus: "transferred" },
    });

    return buffer;
  }
}
