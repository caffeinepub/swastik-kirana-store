import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Category = Text;

  type Product = {
    id : Nat;
    name : Text;
    price : Float;
    category : Category;
    unit : Text; // kg, piece, litre
    inStock : Bool;
  };

  type StoreInfo = {
    name : Text;
    address : Text;
    phone : Text;
    hours : Text;
  };

  var nextProductId = 1;
  let products = Map.empty<Nat, Product>();
  let categories = List.empty<Text>();

  let storeInfo : StoreInfo = {
    name = "Pavan Kirana Store";
    address = "123 Main Road, Mumbai, India";
    phone = "+91 9876543210";
    hours = "9AM - 9PM";
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.toArray();
  };

  public query ({ caller }) func getStoreInfo() : async StoreInfo {
    storeInfo;
  };

  public shared ({ caller }) func addProduct(name : Text, price : Float, category : Category, unit : Text, inStock : Bool) : async () {
    if (not categories.any(func(cat) { cat == category })) {
      categories.add(category);
    };

    let product : Product = {
      id = nextProductId;
      name;
      price;
      category;
      unit;
      inStock;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, price : Float, category : Category, unit : Text, inStock : Bool) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          price;
          category;
          unit;
          inStock;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product does not exist");
    };
    products.remove(id);
  };

  public shared ({ caller }) func deleteCategory(category : Category) : async () {
    let filteredCategories = categories.filter(func(cat) { cat != category });
    categories.clear();
    categories.addAll(filteredCategories.values());
  };

  public shared ({ caller }) func addCategory(category : Category) : async () {
    if (categories.any(func(cat) { cat == category })) {
      Runtime.trap("Category already exists");
    };
    categories.add(category);
  };
};
