import { useNavigate } from "react-router-dom";
import UpdatePasswordForm from "../features/user/UpdatePasswordForm";

function SettingsPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); 
  };

  return (
    <UpdatePasswordForm onClose={handleClose} />
  );
}

export default SettingsPage;
