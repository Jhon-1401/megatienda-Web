import {environment} from "./environments/environment";

export class AppSettings {
  public static rutServProducts = environment.endpoint + "/products";
  public static rutServCart = environment.endpoint + "/cart";
}
