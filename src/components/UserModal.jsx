import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

const UserModal = ({ open, setOpen, selectedUser, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.phoneNumber);
  const [username, setUsername] = useState(selectedUser.username);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(selectedUser.role);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اضافة كتاب جديدة</DialogTitle>
          {/* Remove the default X icon */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="رقم الهاتف"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="اسم المستخدم"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
          />
          <RadioGroup
            className="flex items-end flex-col"
            defaultValue={role}
            onValueChange={(value) => setRole(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="STUDENT" id="r1" />
              <p htmlFor="r1">طالب</p>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="EMPLOYEE" id="r2" />
              <p htmlFor="r2">موظف</p>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onSubmit(phoneNumber, password, username, role)}
          >
            تعديل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
