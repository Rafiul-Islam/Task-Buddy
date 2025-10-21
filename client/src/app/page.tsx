import {redirect} from "next/navigation";
import {AUTH_ROUTES} from "@/constants/auth";

const HomePage = () => redirect(AUTH_ROUTES.SIGN_IN);

export default HomePage;