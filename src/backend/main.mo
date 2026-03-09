import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  // Data Types
  type Category = {
    #coffee;
    #food;
    #dessert;
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Category;
  };

  type ShopInfo = {
    name : Text;
    address : Text;
    phone : Text;
    hours : Text;
  };

  module MenuItem {
    public func compare(a : MenuItem, b : MenuItem) : { #less; #equal; #greater } {
      if (a.id < b.id) { return #less };
      if (a.id > b.id) { return #greater };
      #equal;
    };
  };

  // Store menu items in map
  let menuItems = Map.empty<Nat, MenuItem>();

  // Initialize shop info
  let shopInfo : ShopInfo = {
    name = "ALI Coffee Shop";
    address = "123 Main St, City";
    phone = "555-123-4567";
    hours = "Mon-Fri 8am-8pm, Sat-Sun 9am-6pm";
  };

  // Populate menu items
  system func preupgrade() {
    let items : [MenuItem] = [
      {
        id = 1;
        name = "Espresso";
        description = "Strong and rich coffee";
        price = 2.5;
        category = #coffee;
      },
      {
        id = 2;
        name = "Cappuccino";
        description = "Espresso with steamed milk and foam";
        price = 3.5;
        category = #coffee;
      },
      {
        id = 3;
        name = "Turkey Sandwich";
        description = "Fresh turkey with lettuce and tomato";
        price = 6.0;
        category = #food;
      },
      {
        id = 4;
        name = "Chocolate Cake";
        description = "Rich chocolate layer cake";
        price = 4.0;
        category = #dessert;
      },
    ];

    for (item in items.values()) {
      menuItems.add(item.id, item);
    };
  };

  // Query Functions
  public query ({ caller }) func getShopInfo() : async ShopInfo {
    shopInfo;
  };

  public query ({ caller }) func getMenu() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getMenuByCategory(category : Category) : async [MenuItem] {
    let filtered = menuItems.values().filter(
      func(item) { item.category == category }
    );
    filtered.toArray().sort();
  };

  public query ({ caller }) func getMenuItem(id : Nat) : async MenuItem {
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item does not exist") };
      case (?item) { item };
    };
  };
};
