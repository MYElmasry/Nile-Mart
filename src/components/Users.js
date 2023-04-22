import { useDispatch, useSelector } from "react-redux";
import "devextreme/dist/css/dx.light.css";

import {
  ColumnFixing,
  DataGrid,
  Column,
  ColumnChooser,
  FilterRow,
  SearchPanel,
  Export,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { delUser } from "../rtk/slices/users-slice";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";

const exportFormats = ["xlsx", "pdf"];

function exportGrid(e) {
  if (e.format === "xlsx") {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    exportDataGrid({
      worksheet: worksheet,
      component: e.component,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
    e.cancel = true;
  } else if (e.format === "pdf") {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save("DataGrid.pdf");
    });
  }
}

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = users.slice(1).map((user) => {
    return {
      ...user,
      name: `${user.name.firstname} ${user.name.lastname}`,
      address: user.address
        ? `${user.address.city}, ${user.address.street}`
        : "-",
    };
  });
  return (
    <div>
      <DataGrid
        id="dataGrid"
        columnAutoWidth={true}
        allowColumnReordering={true}
        className="h-full "
        dataSource={data}
        onExporting={exportGrid}
      >
        {/* Configuration goes here */}
        <Column dataField="id" dataType="number"></Column>
        <Column dataField="name" dataType="string"></Column>
        <Column dataField="username" dataType="string"></Column>
        <Column dataField="password" dataType="string"></Column>
        <Column dataField="email" dataType="string"></Column>
        <Column dataField="address" dataType="string"></Column>
        <Column dataField="phone" dataType="string" visible={false}></Column>
        <Column
          dataField="buttons"
          cellRender={(user) => {
            return (
              <button
                className="px-4 border-0 py-1 font-medium duration-300 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => {
                  dispatch(delUser(user.data));
                }}
              >
                Delete
              </button>
            );
          }}
        ></Column>
        <ColumnFixing enabled={true} />
        <ColumnChooser enabled={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <Export enabled={true} formats={exportFormats} />
        <Toolbar>
          <Item location="after">
            <Button
              text="Add User"
              width={136}
              onClick={() => navigate("/register")}
            />
          </Item>
          <Item name="exportButton" />
          <Item name="columnChooserButton" />
          <Item name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </div>
  );
};
export default Users;
