import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setPassword, getPassword, verifyPassword, hasPassword, isAuthenticated, setAuthenticated } from "@/lib/security/passwordManager";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const LandingPage = () => {
  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasPassword()) {
      // 로그인 모드
      if (!verifyPassword(password)) {
        setModalMessage("비밀번호가 일치하지 않습니다.");
        setShowModal(true);
        setPasswordInput(""); // 비밀번호 입력 초기화
        return;
      }
      setAuthenticated();
      navigate('/');
    } else {
      // 최초 비밀번호 설정 모드
      if (password.length < 4) {
        setModalMessage("비밀번호는 최소 4자리 이상이어야 합니다.");
        setShowModal(true);
        return;
      }

      if (password !== confirmPassword) {
        setModalMessage("비밀번호가 일치하지 않습니다.");
        setShowModal(true);
        return;
      }

      // 최초 비밀번호로 설정
      setPassword(password, true);
      setAuthenticated();
      
      setModalMessage("설정 페이지에서 비밀번호를 변경할 수 있습니다.");
      setShowModal(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              {!hasPassword() && (
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
            </div>
            <Button type="submit" className="w-full">
              {hasPassword() ? "로그인" : "시작하기"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>안내</DialogTitle>
          </DialogHeader>
          <p>{modalMessage}</p>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;