import React, { useEffect, useState } from "react";
import axios from "axios";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";
import Swal from "sweetalert2";

DataTable.use(DT);

const App = () => {
  const [tableData, setTableData] = useState([]);
  const fetchBillingData = async () => {
    try {
      const response = await axios.get(
        "https://fueremi.hasura.app/api/rest/invoice",
        {
          headers: {
            "x-hasura-admin-secret":
              "A4xxh5EYO5EfrydYORUlobfBSeJVGyds3RFds5d6Km7k0vghrtK3vNLaU3NSa3VX",
            Accept: "application/json",
          },
          timeout: 5000, // Timeout dalam milidetik (5 detik)
        }
      );
      const responseArray = response.data.poc_rpa_invoice.map((obj) =>
        Object.values(obj)
      );

      setTableData(responseArray);

      return response.data; // Mengembalikan data jika dibutuhkan
    } catch (error) {
      if (error.response) {
        // Server merespons dengan status di luar 2xx
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        // Request dikirim tetapi tidak ada respons
        console.error("No Response Received:", error.request);
      } else {
        // Kesalahan lainnya (misalnya kesalahan dalam konfigurasi request)
        console.error("Request Error:", error.message);
      }
    }
  };

  useEffect(() => {
    Swal.fire({
      title: "Web Scrapping RPA",
      html: "<small>Selamat datang di Web Scrapping untuk POC RPA BNI. Teman-teman vendor dapat menggunakan website ini untuk melakukan scrapping data sesuai use case yang sudah disampaikan</small>",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      willClose: () => {
        fetchBillingData();
      },
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto flex flex-col justify-start items-center p-8">
        {/* TITLE SECTION */}
        <div className="mb-4">
          <h1 className="text-4xl text-center">
            BNI - Web Scrapping for POC RPA
          </h1>
          <small className="text-center block">Created by BNI</small>
        </div>
        {/* DESCRIPTION SECTION */}
        <p className="mb-2">
          Dalam rangka meningkatkan efisiensi operasional dan mengurangi
          pekerjaan manual, BNI melakukan Proof of Concept (POC). Web ini
          merupakan salah satu agenda di POC ini yang bertujuan untuk
          mengotomatiskan pengambilan data dari situs web eksternal maupun
          internal secara cepat, akurat, dan tanpa intervensi manusia.
        </p>
        <p className="mb-4">
          Agar proses pengujian lebih fleksibel dan tidak bergantung pada data
          real-time, situs web yang digunakan dalam POC ini berisi data dummy
          yang dibuat menggunakan Python script. Data ini merepresentasikan
          skenario nyata yang dapat diotomatisasi dalam lingkungan produksi,
          tanpa melibatkan informasi sensitif atau data pelanggan yang
          sebenarnya.
        </p>
        <div className="ml-0 w-full">
          <h2 className="text-2xl">Invoices Table</h2>
          {tableData.length > 0 ? (
            <DataTable
              data={tableData}
              className="display"
              options={{
                responsive: true,
                select: true,
              }}
            >
              <thead>
                <tr>
                  <th>Billing Amount</th>
                  <th>Billing_id</th>
                  <th>Billing_status</th>
                  <th>Client_name</th>
                  <th>Customer_email</th>
                  <th>Customer_phone</th>
                  <th>Datetime_created</th>
                  <th>Datetime_expired</th>
                  <th>Datetime_last_updated</th>
                  <th>Datetime_payment</th>
                  <th>Description</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Payment Status</th>
                  <th>Status</th>
                  <th>VA Number</th>
                </tr>
              </thead>
            </DataTable>
          ) : (
            <div>Waiting ...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
