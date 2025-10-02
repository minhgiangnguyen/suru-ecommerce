// components/ProductCard.tsx
import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from "@mui/material";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  price: number;
  favicon?: string;
}

export default function ProductCard({ id, name, price, favicon }: Props) {
  return (
    <Card>
      <Link href={`/products/${id}`} passHref>
        <CardActionArea>
          {favicon && <CardMedia component="img" height="160" image={favicon} alt={name} />}
          <CardContent>
            <Typography variant="subtitle1">{name}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6">{price?.toLocaleString()} đ</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
