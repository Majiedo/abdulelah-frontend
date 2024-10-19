import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const BookModal = ({
  onCreate,
  onUpdate,
  open,
  setIsOpen,
  defaultValues,
  setDefaultValues,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [pages, setPages] = useState("");
  const [lang, setLang] = useState("English");

  const resetFields = () => {
    setTitle("");
    setAuthor("");
    setCover("");
    setPages("");
    setLang("English");
  };

  const handleOpenChange = (open) => {
    if (!open) {
      resetFields();
      setDefaultValues({});
    }
    setIsOpen(open);
  };

  const handleSubmit = () => {
    if (defaultValues.id) {
      onUpdate(defaultValues.id, title, author, cover, pages, lang);
    } else {
      onCreate(title, author, cover, pages, lang);
    }
  };

  useEffect(() => {
    if (defaultValues.id) {
      setTitle(defaultValues.title);
      setAuthor(defaultValues.author);
      setCover(defaultValues.img);
      setPages(defaultValues.pages);
      setLang(defaultValues.lang);
    }
  }, [defaultValues]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اضافة كتاب جديدة</DialogTitle>
          {/* Remove the default X icon */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="العنوان"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="المؤلف"
          />
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="الصورة"
          />
          <input
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="الصفحات"
          />
          <RadioGroup
            className="flex items-end flex-col"
            defaultValue={lang}
            onValueChange={(value) => setLang(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="English" id="r1" />
              <p htmlFor="r1">English</p>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Arabic" id="r2" />
              <p htmlFor="r2">Arabic</p>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>اضافة</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;
