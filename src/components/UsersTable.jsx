import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AlertModal from "./AlertModal";
import UserModal from "./UserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [deleteAlert, setDeleteAlert] = useState({
    open: false,
    username: "",
  });

  const getAllUsers = () => {
    fetch("http://localhost:4000/user/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = async () => {
    const response = await fetch(
      `http://localhost:4000/user/${deleteAlert.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) return toast.error("حدث خطأ محاولة حذف المستخدم");

    getAllUsers();

    toast.success("تم حذف المستخدم");
  };

  const updateUser = async (phoneNumber, password, username, role) => {
    let updatedFields = { phoneNumber, username, role };

    if (password.length > 0) {
      updatedFields.password = password;
    }

    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] === selectedUser[key]) {
        delete updatedFields[key];
      }
    });

    const response = await fetch(
      `http://localhost:4000/user/${selectedUser.username}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      }
    );

    if (!response.ok) return toast.error("حدث خطأ محاولة تعديل المستخدم");

    getAllUsers();

    toast.success("تم تعديل المستخدم");
  };

  return (
    <div>
      <input
        className="my-5 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن طريق اسم المستخدم"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Phonenumber</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter(
              (item) =>
                item.username.toLowerCase().includes(search.toLowerCase()) ||
                item.phoneNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-left">{user.phoneNumber}</TableCell>
                <TableCell className="text-left">{user.username}</TableCell>
                <TableCell className="text-left">
                  {user.role.toLowerCase()}
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={user.role === "LIBRARIAN"}
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditingModal(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={user.role === "LIBRARIAN"}
                        className="text-red-500"
                        onClick={() =>
                          setDeleteAlert({
                            open: true,
                            username: user.username,
                          })
                        }
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="text-left">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {
                users.filter(
                  (item) =>
                    item.username
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.phoneNumber
                      .toLowerCase()
                      .includes(search.toLowerCase())
                ).length
              }
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <AlertModal
        onClick={handleDeleteUser}
        buttonText="حذف"
        open={deleteAlert.open}
        setOpen={setDeleteAlert}
      />
      {isEditingModal && (
        <UserModal
          open={isEditingModal}
          setOpen={setIsEditingModal}
          onSubmit={updateUser}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersTable;
