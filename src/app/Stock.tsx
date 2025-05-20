import { useEffect, useState } from "react";
import { useElectronReady } from "../hooks/useElectronReady";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const isElectronReady = useElectronReady();

  useEffect(() => {
    if (!isElectronReady) return;

    const fetchProducts = async () => {
      try {
        const data = await window.electron.ipcRenderer.invoke("get-products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [isElectronReady]);

  console.log("Products:", products);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl mb-6">สต็อก</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full max-w-4xl">
        <table className="table text-center">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อสินค้า</th>
              <th>ราคา</th>
              <th>จำนวนในสต็อก</th>
              <th>วันที่เพิ่ม</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>
                    {new Date(product.created_at).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-xs">ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  ไม่มีข้อมูลสินค้า
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
