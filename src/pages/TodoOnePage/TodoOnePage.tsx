import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";
import fetchApi from "../../helpers/fetchApi";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  // {
  //   type: FieldType.Line,
  //   title: "System info",
  // },
  {
    type: FieldType.Group,
    desktopColumns: "3",
    phoneColumns: "12",
    tabletColumns: "12",
    fields: [
      {
        type: FieldType.Box,
        style: {
          backgroundColor: "#54545447",
          width: "200px",
          height: "200px",
          margin: "0 auto",
        },
      },
      {
        type: FieldType.Rating,
        name: "rating",
      },
    ],
  },
  {
    type: FieldType.Group,
    desktopColumns: "9",
    phoneColumns: "12",
    tabletColumns: "12",
    fields: [
      {
        type: FieldType.Line,
        title: "Profile",
      },
      {
        type: FieldType.Combo,
        title: "Sex",
        name: "sex",
        itemList: ["Male", "Female", "Other"],
      },
      {
        type: FieldType.Combo,
        title: "List",
        name: "list",
        itemList: ["Blocklist", "VIP", "Other people"],
      },
      {
        type: FieldType.Div,
        style: {
          display: "grid",
          gridTemplateColumns: "2fr auto",
        },
        fields: [
          {
            type: FieldType.Text,
            name: "keyword",
            title: "Key words",
            outlined: false,
            isDisabled: (obj) => !obj["completed"],
          },
          {
            type: FieldType.Checkbox,
            fieldBottomMargin: "0",
            name: "completed",
            title: "Key words",
          },
        ],
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "General information",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "First Name",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Last Name",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Age",
    description: "",
    isInvalid: function (obj) {
      var value = Number(obj.age);
      if (!Number.isInteger(value)) {
        return "Age must be a number";
      } else if (value < 1) {
        return "Age must be greater than 1";
      } else {
        return null;
      }
    },
  },
  {
    type: FieldType.Expansion,
    title: "Subscription",
    description: "Subscribe to notifications",
    fields: [
      {
        type: FieldType.Switch,
        name: "subscribed",
        title: "Allow mailing",
      },
      {
        name: "email",
        type: FieldType.Text,
        isDisabled: function (obj) {
          return !obj.subscribed;
        },
        isInvalid: function (_a) {
          var email = _a.email;
          var expr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          if (!expr.test(email)) {
            return "Invalid email address provided";
          } else {
            return null;
          }
        },
        title: "Email",
        description: "tripolskypetr@gmail.com",
      },
    ],
  },
  {
    type: FieldType.Group,
    desktopColumns: "6",
    tabletColumns: "12",
    fields: [
      {
        type: FieldType.Line,
        title: "Job",
      },
      {
        type: FieldType.Text,
        name: "jobTitle",
        title: "Job title",
      },
      {
        type: FieldType.Text,
        name: "jobArea",
        title: "Job area",
      },
    ],
  },
  {
    type: FieldType.Group,
    desktopColumns: "6",
    tabletColumns: "12",
    fields: [
      {
        type: FieldType.Line,
        title: "Home address",
      },
      {
        type: FieldType.Text,
        name: "country",
        title: "Country",
      },
      {
        type: FieldType.Text,
        name: "city",
        title: "City",
      },
      {
        type: FieldType.Text,
        name: "state",
        title: "State",
      },
      {
        type: FieldType.Text,
        name: "address",
        title: "Address",
      },
    ],
  },
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [fetchApi<ITodoItem>(`/users/${id}`)] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        fetchApi(`/users/${data.id}`, {method: "PUT", body: JSON.stringify(data)})  
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
