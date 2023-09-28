import {
  List,
  FieldType,
  ColumnType,
  ActionType,
  TypedField,
  IColumn,
  IListAction,
  useArrayPaginator,
  SelectionMode,
} from "react-declarative";

import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import useLoader from "../../hooks/useLoader";

const filters: TypedField[] = [
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Search",
  },
  {
    type: FieldType.Checkbox,
    name: "completed",
    title: "Completed",
  },
];

const columns: IColumn[] = [
  {
    type: ColumnType.Text,
    field: "id",
    headerName: "ID",
    secondary: true,
    width: () => 160,
  },
  {
    type: ColumnType.Text,
    headerName: "FirstName",
    primary: true,
    field: "firstName",
    width: () => 130,
  },
  {
    type: ColumnType.Text,
    headerName: "LastName",
    primary: true,
    field: "lastName",
    width: () => 130,
  },
  {
    type: ColumnType.Action,
    headerName: "Actions",
    sortable: false,
    width: () => 100,
  },
];

const actions: IListAction[] = [
  {
    type: ActionType.Add,
  },
  {
    type: ActionType.Menu,
    options: [
      {
        action: "add-action",
        label: "Create new row",
        icon: Add,
      },
      {
        action: "update-now",
      },
      {
        action: "resort-action",
      },
    ],
  },
];

const rowActions = [
  {
    label: "Remove action",
    action: "remove-action",
    icon: Delete,
  },
];

const heightRequest = () => window.innerHeight - 75;

export const TodoListPage = () => {
  const { setLoader } = useLoader();

  const handler = useArrayPaginator(
    async () => await fetchApi("/users"),
    {
      onLoadStart: () => setLoader(true),
      onLoadEnd: () => setLoader(false),
    }
  );

  const handleRowActionsClick = (action: string, row: any) => {
    // alert(JSON.stringify({ row, action }, null, 2));
    fetchApi(`/users/${row.id}`, {method: "DELETE"})
  };
  // const handleColumnActionClick = (action: string, row: any, selectedRows: any[] ) => {
  //   console.log(selectedRows);
  //   alert(JSON.stringify({ row, action }, null, 2));
  // };

  const handleAction = (action: string) => {
    if("add-action" === action){
      history.push(`/todos_list/add`);
    }
  };

  const handleClick = (row: any) => {
    history.push(`/todos_list/${row.id}`);
  };

  return (
    <List
      title="People"
      filterLabel="Filters"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      // onColumnAction={handleColumnActionClick}
      onRowAction={handleRowActionsClick}
      onRowClick={handleClick}
      onAction={handleAction}
      selectionMode={SelectionMode.Multiple}
    />
  );
};

export default TodoListPage;
