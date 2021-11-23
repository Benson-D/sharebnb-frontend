import React from "react";
import { ContextInterface } from "../interfaces/auth";

const UserContext = React.createContext<ContextInterface | null>(null);

export default UserContext;
