import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function UploadAllProducts() {
  const menProducts = [
    {
      img: "https://images.meesho.com/images/products/87745823/nzufd_512.webp",
      name: "Classic Blue Shirt",
      price: "₹999",
     
    },
    {
      img: "https://m.media-amazon.com/images/I/81dV52s97pL._UY1100_.jpg",
      name: "Formal Suit",
      price: "₹3499",
     
    },
    {
      img: "https://m.media-amazon.com/images/I/81HS8+UraSL._UY1100_.jpg",
      name: "Casual T-shirt",
      price: "₹599",
     
    },
    {
      img: "https://m.media-amazon.com/images/I/91V1PedXVmL._UY1100_.jpg",
      name: "Denim Jacket",
      price: "₹1799",
         },
    {
      img: "https://5.imimg.com/data5/ECOM/Default/2022/12/LA/XE/UZ/31800535/1663570648405-melange-grey-originnm80prcnt-500x500.jpg",
      name: "Winter Hoodie",
      price: "₹1299",
     
    },
    {
      img: "https://www.jiomart.com/images/product/original/rvezcb4mop/podge-men-slim-fit-denim-mid-rise-black-jeans-product-images-rvezcb4mop-2-202302210937.jpg?im=Resize=(500,630)",
      name: "Slim Fit Jeans",
      price: "₹1199",
     
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4oGFALxZ-vJAuX3scK6bbYaD34_rSZ1QFZA&s",
      name: "Leather Jacket",
      price: "₹2999",
     
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDVQFcn5TLud1ZTnJIAlDXvpoZ-dHu5LY3g&s",
      name: "Checked Shirt",
      price: "₹899",
     
    },
    {
      img: "https://www.jiomart.com/images/product/original/rvpwdw15di/deals4you-white-sneakers-for-men-product-images-rvpwdw15di-0-202305101840.jpg?im=Resize=(500,630)",
      name: "White Sneakers",
      price: "₹1499",
     
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSac3ZdJ8aUOaEnsec0w-qiYGass_Hb9sPGaQ&s",
      name: "Sports Shoes",
      price: "₹1799",
      
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbamkBDN8ei8QxnlWoWHcuEw_pjiBo1-osvg&s",
      name: "Black Trousers",
      price: "₹1099",
      
    },
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2023/5/307036002/QI/DA/LU/18345537/11.jpg",
      name: "Grey Blazer",
      price: "₹2599",
      
    },
    {
      img: "https://images.bewakoof.com/t540/men-s-grey-eternity-graphic-printed-oversized-t-shirt-596129-1735645993-1.jpg",
      name: "Printed T-shirt",
      price: "₹699",
      
    },
    {
      img: "https://m.media-amazon.com/images/I/71mqVXQ+U+L._UY1100_.jpg",
      name: "Cargo Pants",
      price: "₹1399",
      
    },
    {
      img: "https://assets.ajio.com/medias/sys_master/root/20240728/2Q9Q/66a5e95b6f60443f31cfe2fc/-473Wx593H-463241397-white-MODEL.jpg",
      name: "Sweatshirt",
      price: "₹899",
      
    },
    {
      img: "https://m.media-amazon.com/images/I/91rB5JQ7jDL._UY1100_.jpg",
      name: "Blue Jeans",
      price: "₹1199",
      
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHfTm55smlfrhTIY6bR4tn46EsNf__JD227A&s",
      name: "Brown Boots",
      price: "₹1999",
      
    },
    {
      img: "https://images.meesho.com/images/products/382299388/mm97l_512.webp",
      name: "Casual Shorts",
      price: "₹799",
      
    },
    {
      img: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1352637_alternate10?$plpDeskRF$",
      name: "White Polo",
      price: "₹799",
          },
    {
      img: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/26766100/2024/3/22/f0bf1156-c8d0-476b-82d9-fefa38ef53771711091962396-ADIDAS-Originals-Men-Track-Pants-2451711091961910-1.jpg",
      name: "Track Pants",
      price: "₹999",
      
    },
    {
      img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/22204562/2024/2/21/7938b119-8a50-4bdc-ae67-7ed5b6f2f9161708511691212LibertyMenTexturedLeatherFormalBrogues1.jpg",
      name: "Formal Shoes",
      price: "₹2499",
      
    },
    {
      img: "https://imagescdn.louisphilippe.com/img/app/product/9/959620-12437272.jpg?auto=format&w=390",
      name: "Navy Blazer",
      price: "₹2799",
      
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7P14RIcsBl5pdPPWzMz4pf_WWwAaPLo50uw&s",
      name: "Graphic Tee",
      price: "₹599",
          },
    {
      img: "https://www.italiancolony.com/cdn/shop/files/3_a2c3d245-4b8f-480a-ab42-f4d3ce95dfa9.jpg?v=1720765033",
      name: "Joggers",
      price: "₹1099",
      
    },
    {
      img: "https://m.media-amazon.com/images/I/616fhs-tkNL.UY1100.jpg",
      name: "Winter Cap",
      price: "₹399",
      
    },
    {
      img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25542372/2023/12/27/92c91dbd-6f8e-4f7b-a89b-fb1c1e47c84d1703677591009-Roadster-Mens-Denim-Oversize-Shirt-5751703677590564-1.jpg",
      name: "Denim Shirt",
      price: "₹999",
      
    },
    {
      img: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/25329046/2023/10/5/4fe2f946-7106-4f22-b326-e13b12201c871696483717552RoadsterMenVeganLeatherBelt1.jpg",
      name: "Leather Belt",
      price: "₹499",
      
    },
    {
      img: "https://imagescdn.louisphilippe.com/img/app/product/3/39755989-15864832.jpg?auto=format&w=390",
      name: "Checked Blazer",
      price: "₹2999",
      
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BOQaSYh4ktWMy-db6XBXH9fpV8vYmTpBCQ&s",
      name: "Sports Watch",
      price: "₹1599",
      
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcCoEoTJ94O4aG4WEqpwYgTf_g-bQMFh9kQ&s",
      name: "Sunglasses",
      price: "₹899",
      
    }  ];

  const womenProducts = [
 {
            img: "https://modamello.com/wp-content/uploads/2024/06/image-7.png",
            name: "Elegant Red Dress",
            price: "₹1499"
        },
        {
            img: "https://m.media-amazon.com/images/I/61qDaOZzfKL._UY1100_.jpg",
            name: "Trendy Sunglasses",
            price: "₹499"
        },
        {
            img: "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw5682a19a/images/Fastrack/Catalog/F24SSALAV07TN1_9.jpg?sw=600&sh=600",
            name: "Classic Handbag",
            price: "₹1999"
        },
        {
            img: "https://www.jiomart.com/images/product/original/rvib7nop19/moomaya-sleeveless-peplum-strappy-top-printed-cotton-tank-top-summer-tops-product-images-rvib7nop19-0-202308191602.jpg?im=Resize=(500,630)",
            name: "Summer Top",
            price: "₹799"
        },
        {
            img: "https://uspoloassn.in/cdn/shop/products/1_03199a04-5ce3-4558-b074-453da8f597dd.jpg",
            name: "Blue Jeans",
            price: "₹1199"
        },
        {
            img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/29068106/2024/10/8/f69a46bd-e13a-44b0-bc9f-90d27d9cc05c1728369194574-her-by-invictus-Women-Blazers-5971728369193898-1.jpg",
            name: "Formal Blazer",
            price: "₹2499"
        },
        {
            img: "https://m.media-amazon.com/images/I/91YKqR+X9NL._UY1100_.jpg",
            name: "Printed Kurti",
            price: "₹999"
        },
        {
            img: "https://m.media-amazon.com/images/I/71IS4-USxcL._UY1000_.jpg",
            name: "Stylish Heels",
            price: "₹1299"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHTp0zcs7FeUryhuHFplDpRSLkVZgpuxrzdA&s",
            name: "Party Gown",
            price: "₹2999"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZHg7X77a7bgy7r46hwZ8bL6JYkIxpveY1A&s",
            name: "Ethnic Saree",
            price: "₹1899"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSOPZnyk-r9ec6ZfKqniFrAPorD6RYy6iVQ&s",
            name: "Designer Dupatta",
            price: "₹599"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfUtrjUPEZ1d8J7hpsxO3BS-tcByy8xJ0B9A&s",
            name: "Casual T-shirt",
            price: "₹499"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjH9kIpLTDcRNvW3I8gVS_j6IITTShpX4b2A&s",
            name: "Trendy Skirt",
            price: "₹899"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt98PEOHoJKbUXsUsTDtiR1A-i3eqXY9Z6Jw&s",
            name: "Fashion Earrings",
            price: "₹299"
        },
        {
            img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/23644542/2023/9/11/8867041d-b83e-41b9-95ff-006aac3a0e9e1694436803504DENNISONWomenSolidSlimFitSingleBreasted2-PieceFormalSuit1.jpg",
            name: "Formal Suit",
            price: "₹3499"
        },
        {
            img: "https://assets.ajio.com/medias/sys_master/root/20231016/L6FL/652c5051afa4cf41f5466bdf/-473Wx593H-466711316-blue-MODEL.jpg",
            name: "Printed Dress",
            price: "₹1099"
        },
        {
            img: "https://www.aroundalways.com/cdn/shop/files/HopeSandals2.jpg?v=1748329397",
            name: "Stylish Sandals",
            price: "₹799"
        },
        {
            img: "https://africanboutique.in/wp-content/uploads/2022/01/CS-0828-1-scaled-1.jpg",
            name: "Evening Gown",
            price: "₹2599"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeWKMzQl75EtxTgVObY0-qjvppkxLgWXxHGQ&s",
            name: "Designer Lehenga",
            price: "₹3999"
        },
        {
            img: "https://mahezon.in/cdn/shop/files/IMG-20240513_202034_310.jpg?v=1715612319",
            name: "Red Saree",
            price: "₹1599"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJwRmU9xe32YY9ySLf0GF2GgMmZMAfrzadmQ&s",
            name: "Boho Necklace",
            price: "₹349"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9GUko-RD-xCpn51OWN4Q_JzI2xSoOsEeJsw&s",
            name: "Denim Jacket",
            price: "₹1599"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28otrcmyM2tvO64NyYZRYQgDEIX_84cd-AQ&s",
            name: "Crop Hoodie",
            price: "₹999"
        },
        {
            img: "https://images.meesho.com/images/products/425939205/idxuq_512.webp",
            name: "Hair Accessories Set",
            price: "₹299"
        },
        {
            img: "https://www.jiomart.com/images/product/original/rvqthd4tap/popwings-single-button-closure-women-black-shrug-shrugs-for-women-latest-solid-design-shrugs-women-stylish-shrugs-regular-shrugs-product-images-rvqthd4tap-1-202310181807.jpg?im=Resize=(500,630)",
            name: "Western Jumpsuit",
            price: "₹1399"
        },
        {
            img: "https://www.stylemantraas.com/wp-content/uploads/2021/12/3a8a5d5c-87c4-4afb-aec3-7e95b5d029a5-410x410.jpg",
            name: "Black Shrug",
            price: "₹649"
        },
        {
            img: "https://4.bp.blogspot.com/-g9nebrbgW2c/VtyO2RhdpOI/AAAAAAAAWqo/iX6Knftb1SA/s0/Jolie%2BMoi%2Bflorl%2Bskirt.JPG",
            name: "Floral Midi Skirt",
            price: "₹999"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBqRFRv0O_8TCPiJNGgS9bcu4pFoDqEmC9A&s",
            name: "Traditional Suit Set",
            price: "₹2299"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTP5S3LrumYmIJqNQV_qLqxJBLVXVkzjVRKw&s",
            name: "Festive Kurti",
            price: "₹1199"
        },
        {
            img: "https://m.media-amazon.com/images/I/21fmoZVJ9gL.AC_SR175,263_QL70.jpg",
            name: "Office Wear Combo",
            price: "₹2899"
        },
        {
            img: "https://img.kwcdn.com/product/fancy/2464ad07-96f7-4809-9074-477b206c64aa.jpg?imageView2/2/w/500/q/60/format/webp",
            name: "Yellow Handbag",
            price: "₹899"
        }  ];

  const kidsProducts = [
    {
    img: "https://staranddaisy.in/wp-content/uploads/2022/12/51RnmUGWpxL.jpg",
    name: "Toy Car - Red",
    price: "₹1450"
  },
  {
    img: "https://www.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/yP-mplace/Toys/YPB09BL58LJB_1.jpg&resizeTo=600",
    name: "Teddy Bear (Brown)",
    price: "₹1200"
  },
  {
    img: "https://staranddaisy.in/wp-content/uploads/2023/09/dr-mady-s-mini-doll-house-naivri-2_bf6c923a-9db8-4243-a9d2-574b4742b000.png",
    name: "Doll House Set",
    price: "₹1999"
  },
  {
    img: "https://images-cdn.ubuy.co.in/63519c5510a71043c87053b4-stjoyopy-88pcs-big-building-blocks-with.jpg",
    name: "Building Blocks",
    price: "₹999"
  },
  {
    img: "https://m.media-amazon.com/images/I/71K2ASj-1ML.jpg",
    name: "Remote Control Helicopter",
    price: "₹1550"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-unLqnQjU3CstIc7HkYF8QbpVXqIfbBrrQ&s",
    name: "Kids Sports Shoes",
    price: "₹1300"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPVIw7EMMZFH8GH8UMWLR4KkXo4AZFasywQ&s",
    name: "Baby Walker with Music",
    price: "₹1850"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwIi0kFdIu_RtbxolrTztyG-ZYQkI63MTuw&s",
    name: "Kids Puzzle Set",
    price: "₹950"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAssk7nB4QZ7VIVQDfRa0A0KlbBl_pFVOaA&s",
    name: "Boys Cartoon T-Shirt",
    price: "₹599"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08OcPvfZF1JDe0Q6IRaJ2FByiqybAe75yDw&s",
    name: "Girls Party Dress",
    price: "₹2999"
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2023/1/SX/FN/TE/3310206/kids-winter-jacket-500x500.jpg",
    name: "Kids Winter Jacket",
    price: "₹1600"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOmI1EJ0CL7Fery82Kr7gn3V14LM3bb9tzEw&s",
    name: "Toy Train Set",
    price: "₹750"
  },
   { img: "https://m.media-amazon.com/images/I/71imzfqxcJL.jpg", name: "Coloring Book", price: "₹199" },
  { img: "https://www.shutterstock.com/image-photo/vintage-tin-robot-toy-isolated-600nw-1206408244.jpg", name: "Toy Robot", price: "₹1299" },
  { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Transparante_kunststof_zuigfles_met_blauwe_dop_en_siliconen_speen%2C_antilekplaatje_en_schroefbevestiging%2C_objectnr_83556-A-E.JPG/1200px-Transparante_kunststof_zuigfles_met_blauwe_dop_en_siliconen_speen%2C_antilekplaatje_en_schroefbevestiging%2C_objectnr_83556-A-E.JPG", name: "Baby Bottle", price: "₹399" },
  { img: "https://m.media-amazon.com/images/I/610hTAmlFlL.jpg", name: "Bath Toy Set", price: "₹499" },
  { img: "https://m.media-amazon.com/images/I/51Gsna7DNvL.jpg", name: "Mini Slide", price: "₹1750" },
  { img: "https://m.media-amazon.com/images/I/31QFD2xXzfL.jpg", name: "Toy Guitar", price: "₹999" },
  { img: "https://genietravel.com/cdn/shop/files/Artboard2copy3_92ea62aa-208f-425c-92da-7aaf5e53374b_1500x.jpg?v=1737444868", name: "School Backpack", price: "₹890" },
  { img: "https://m.media-amazon.com/images/I/81NM3P-NoqL._UF894,1000_QL80_.jpg", name: "Kids Sunglasses", price: "₹299" },
  { img: "https://m.media-amazon.com/images/I/81d3MmAGQNL.jpg", name: "Drawing Kit", price: "₹499" },
  { img: "https://antling.in/cdn/shop/files/premium_cap_lavender_priamry_1.png?v=1729855160", name: "Baby Cap", price: "₹199" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9IBUBcK6aGFTmd7Yz7VcyIWehcYWzxK3iw&s", name: "Bubble Maker", price: "₹399" },
  { img: "https://toyshine.in/cdn/shop/products/RODEO_PINK_1.jpg?v=1675942697", name: "Scooter", price: "₹2200" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKaAhz8pdn01-PN-sAUZUtlSPeC1tvTf1Fg&s", name: "Toy Camera", price: "₹699" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDhJ-Mlf_ytY34FhMpyPv7Lf13U437eFmhag&s", name: "Fancy Hat", price: "₹349" },
  { img: "https://m.media-amazon.com/images/I/61l6mlc0slL.jpg", name: "Musical Toy", price: "₹899" },
  { img: "https://m.media-amazon.com/images/I/71KwPy8BPiL.jpg", name: "Sports Ball", price: "₹750" },
  { img: "https://rukminim2.flixcart.com/image/850/1000/kwcfngw0/book/0/n/p/moral-story-book-illustrated-story-book-for-kids-1-original-imag9fnf6pcargfc.jpeg?q=90&crop=false", name: "Story Book", price: "₹299" },
  { img: "https://m.media-amazon.com/images/I/41HkYHWoZZL._UF1000,1000_QL80_.jpg", name: "Cradle Toy", price: "₹649" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPoVEuVwYUPp3jHqkGDtSuUahgM8J3-hOKjg&s", name: "Birthday Cap", price: "₹129" },
  { img: "https://m.media-amazon.com/images/I/71+7zb2j2OL._UF1000,1000_QL80_.jpg", name: "Tricycle", price: "₹1799" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9Kfa0aQ07CBCOs0g9OXuyiYCdlhAAUVvFg&s", name: "Learning Tablet", price: "₹1349" },
  { img: "https://m.media-amazon.com/images/I/71lcJdGdlWL.jpg", name: "Toy Drum", price: "₹799" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GDn2L7fIhgmzjlHog0UPz42uyIZ02A2iTA&s", name: "Cartoon Watch", price: "₹599" },
  { img: "https://m.media-amazon.com/images/I/716aM2QIXmS.jpg", name: "Action Figure", price: "₹1599" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHYWrTG1gbnxYGSZLQQZ0S6-nF6VnuVQu9UA&s", name: "Sand Toy Set", price: "₹499" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuZf3k6pu6Iwdh02rMBQgjTL4WwOURSeAWnA&s", name: "Water Gun", price: "₹399" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQceEKbotLfQkeZMnbxdFvZNvV_Y5GrTfGC7Q&s", name: "Sipper Bottle", price: "₹349" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFyZvEX5mLvvrFln3Zn0sb4jnglGy7L3Vlw&s", name: "Magic Slate", price: "₹449" },
  { img: "https://m.media-amazon.com/images/I/61mHEtRZH9L.jpg", name: "Rattle Toy", price: "₹299" },
  { img: "https://www.thesprucecrafts.com/thmb/JKau-8-Kb7qgkXjYw5js6Ru3ijA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1016070420-895353d76aee4af79eef0104780ba20c.jpg", name: "Kite", price: "₹149" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPj9jvINT62-LToC3xIFti8b61Cf9j4M1CbA&s", name: "Swimming Tube", price: "₹599" },
  { img: "https://m.media-amazon.com/images/I/717MCdayvjL._UF1000,1000_QL80_.jpg", name: "Alphabet Blocks", price: "₹499" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDVhgGcp7I7090eyWSIaw2G6MjiGUKaAZ6JQ&s", name: "Night Lamp", price: "₹899" },
  { img: "https://m.media-amazon.com/images/I/71cQmNhuARL._UF1000,1000_QL80_.jpg", name: "Soft Pillow", price: "₹499" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-lmGFl8xqi9EbctjSbutjzUtT0AeYmdWRPA&s", name: "Toy Binoculars", price: "₹550" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPzlOGL3JwUIHEX1NP83O5gyqpMcCOQtLgQ&s", name: "Kids Tent", price: "₹1249" },
  { img: "https://m.media-amazon.com/images/I/61jr4rDBISL._UF894,1000_QL80_.jpg", name: "Wall Stickers", price: "₹349" },
  { img: "https://m.media-amazon.com/images/I/811Ynd0M1ML._UF1000,1000_QL80_.jpg", name: "Pop-up Book", price: "₹299" }
  ];

  const uploadAll = async () => {
    try {
      for (const item of menProducts) {
        await addDoc(collection(db, "menProducts"), item);
      }
      for (const item of womenProducts) {
        await addDoc(collection(db, "womenProducts"), item);
      }
      for (const item of kidsProducts) {
        await addDoc(collection(db, "kidsProducts"), item);
      }
      alert("✅ Men, Women, and Kids products uploaded successfully!");
    } catch (error) {
      console.error("❌ Error uploading products:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Upload Men, Women & Kids Products to Firebase</h1>
      <button onClick={uploadAll} style={{
        padding: "15px 30px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        Upload All Products
      </button>
    </div>
  );
}

export default UploadAllProducts;
