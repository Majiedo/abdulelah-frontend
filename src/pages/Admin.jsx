import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import BackButton from "../components/BackButton";
import BooksTable from "../components/BooksTable";
import UsersTable from "../components/UsersTable";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-container">
      <BackButton />
      {user.role === "LIBRARIAN" ? (
        <Tabs defaultValue="books" className="w-1/2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">الكتب</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
          </TabsList>
          <TabsContent value="books">
            <BooksTable />
          </TabsContent>
          <TabsContent value="users">
            <UsersTable />
          </TabsContent>
        </Tabs>
      ) : (
        <BooksTable />
      )}
    </div>
  );
};

export default Admin;
