import { Paginate } from "../../common/interfaces/paginate";
import { User } from "./user.interface";

export interface UserPaginate extends Paginate{
  users: [User]
}