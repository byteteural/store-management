import { useEffect, useState } from "react";
import { useElectronReady } from "../hooks/useElectronReady";

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}

interface Bill {
  id: number;
  customer_name?: string;
  total_amount: number;
  created_at: string;
}

export default function Store() {
  const [bills, setBills] = useState<Bill[]>([]);
  const isElectronReady = useElectronReady();

  useEffect(() => {
    if (!isElectronReady) return;

    const fetchProducts = async () => {
      try {
        const data = await window.electron.ipcRenderer.invoke("get-bills");
        setBills(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [isElectronReady]);

  const handleCreateBill = async () => {
    if (!isElectronReady) {
      console.warn("Electron not ready");
      return;
    }

    const newBill = {
      customer_name: "ลูกค้าทั่วไป",
      total_amount: 0,
    };

    try {
      await window.electron.ipcRenderer.invoke("create-bill", newBill);
      const updatedBills = await window.electron.ipcRenderer.invoke(
        "get-bills"
      );
      setBills(updatedBills);
    } catch (err) {
      console.error("Failed to create bill:", err);
    }
  };
  console.log("window.electron:", window.electron);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl">รายการขาย</h1>
        <button
          className="btn btn-primary mt-4"
          onClick={handleCreateBill}
          disabled={!isElectronReady}
        >
          เพิ่มบิลใหม่
        </button>
      </div>

      <div className="flex items-between justify-between mt-4 w-[80%]">
        <p className="text-2xl">
          วันที่:
          {new Date().toLocaleDateString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <p className="text-2xl">เลขที่บิล:</p>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-[90%] mt-6">
        <table className="table text-center">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อลูกค้า</th>
              <th>ยอดรวม</th>
              <th>เวลา</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((bill, index) => (
                <tr key={bill.id}>
                  <td>{index + 1}</td>
                  <td>{bill.customer_name || "ไม่มีชื่อลูกค้า"}</td>
                  <td>{bill.total_amount.toLocaleString()}</td>
                  <td>
                    {new Date(bill.created_at).toLocaleString("th-TH", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-xs">ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  ไม่มีข้อมูลบิล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
