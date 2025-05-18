export default function Store() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl">รายการขาย</h1>
      </div>
      <div className="flex  items-between justify-between mt-4 w-[80%]">
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
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-[100%]">
        <table className="table items-center justify-center text-center">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รายการ</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>รวม</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Coco-Cola</td>
              <td>26</td>
              <td>2</td>
              <td>52</td>
              <td>
                <button className="btn btn-warning btn-xs">ลบ</button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Chocolate</td>
              <td>15</td>
              <td>2</td>
              <td>30</td>
              <td>
                <button className="btn btn-warning btn-xs">ลบ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
