import { useState, useEffect } from "react";
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
import { motion, HTMLMotionProps } from "framer-motion";
import { Shield, Lock, ArrowRight } from "lucide-react";

// motion 컴포넌트를 위한 타입 정의
type MotionDivProps = HTMLMotionProps<"div">;

const LandingPage = () => {
  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // 컴포넌트 마운트 시 입력 필드 초기화
  useEffect(() => {
    setPasswordInput("");
    setConfirmPassword("");
  }, []);

  // 로그아웃 이벤트 리스너 추가
  useEffect(() => {
    const handleLogout = () => {
      setPasswordInput("");
      setConfirmPassword("");
    };

    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

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

  const welcomeMessage = hasPassword() 
    ? "비밀번호를 입력하여 주세요."
    : "프로그램을 안전하게 사용하기 ��해 비밀번호를 설정해 주세요.";

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Multi Stock Management에 오신 것을 환영합니다
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-gray-600">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5 text-blue-500" />
            <p className="text-center">{welcomeMessage}</p>
          </motion.div>
          {!hasPassword() && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <p className="text-center">최초 비밀번호는 임의로 입력하시고 로그인 하세요.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <p className="text-center">설정된 비밀번호는 나중에 '설정' 메뉴에서 변경할 수 있습니다.</p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: hasPassword() ? 0.5 : 0.9,
          duration: 0.6,
          ease: "easeOut"
        }}
        className="w-[400px]"
      >
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
      </motion.div>

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