import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getPassword, setPassword, verifyPassword, isInitialPassword } from "@/lib/security/passwordManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const PasswordManagement = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const { toast } = useToast();

  const isInitial = isInitialPassword();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      setModalMessage("현재 비밀번호를 입력해주세요.");
      setIsSuccessModal(false);
      setShowModal(true);
      return;
    }

    const storedPassword = getPassword();
    if (currentPassword !== storedPassword) {
      setModalMessage("현재 비밀번호가 일치하지 않습니다.");
      setIsSuccessModal(false);
      setShowModal(true);
      return;
    }

    if (newPassword.length < 4) {
      setModalMessage("새 비밀번호는 최소 4자리 이상이어야 합니다.");
      setIsSuccessModal(false);
      setShowModal(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage("새 비밀번호가 일치하지 않습니다.");
      setIsSuccessModal(false);
      setShowModal(true);
      return;
    }

    setPassword(newPassword, false);
    
    setModalMessage(isInitial 
      ? "초기 비밀번호가 성공적으로 변경되었습니다."
      : "비밀번호가 성공적으로 변경되었습니다.");
    setIsSuccessModal(true);
    setShowModal(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          비밀번호 관리
          {isInitial && (
            <span className="text-sm font-normal text-red-500 ml-2">
              (초기 비밀번호 사용 중)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>새 비밀번호 확인</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit">비밀번호 변경</Button>
        </form>
      </CardContent>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className={isSuccessModal ? "bg-green-50" : undefined}>
          <DialogHeader>
            <DialogTitle>{isSuccessModal ? "완료" : "안내"}</DialogTitle>
          </DialogHeader>
          <p>{modalMessage}</p>
          <DialogFooter>
            <Button 
              onClick={() => setShowModal(false)}
              className={isSuccessModal ? "bg-green-600 hover:bg-green-700" : undefined}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PasswordManagement; 