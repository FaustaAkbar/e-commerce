import 'package:flutter/material.dart';
import 'package:pet_shop/widget/color_palete.dart';
import 'package:get/get.dart';
import 'package:pet_shop/widget/kategori_model.dart';

import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(236, 255, 255, 255),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 249, 249, 249),
        toolbarHeight: 100,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
                width: 50,
                height: 50,
                child: Image.asset(
                  "assets/images/paw.png",
                )),
            SizedBox(
              height: 10,
              width: 5,
            ),
            Text(
              'Pet Shop',
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 20,
                color: Colors.deepPurple,
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: EdgeInsets.all(16),
                child: TextField(
                  cursorHeight: 35,
                  textAlignVertical: TextAlignVertical.center,
                  decoration: InputDecoration(
                      hintText: 'Search for product..',
                      hintStyle: TextStyle(
                        fontSize: 20,
                      ),
                      border: InputBorder.none,
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(30),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(30),
                        borderSide: BorderSide(color: AppColors.primaryColor),
                      ),
                      filled: true,
                      fillColor: Colors.grey.shade100,
                      suffix: Container(
                        padding: EdgeInsets.all(5),
                        child: Icon(Icons.search),
                      )),
                ),
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ButtonKategori(onPressed: () {}, label: "All"),
                    SizedBox(
                      width: 3,
                    ),
                    ButtonKategori(onPressed: () {}, label: "Dogs"),
                    SizedBox(
                      width: 3,
                    ),
                    ButtonKategori(onPressed: () {}, label: "Cats"),
                    SizedBox(
                      width: 3,
                    ),
                    ButtonKategori(onPressed: () {}, label: "Fish"),
                    SizedBox(
                      width: 3,
                    ),
                    ButtonKategori(onPressed: () {}, label: "Birds"),
                    SizedBox(
                      width: 3,
                    ),
                    ButtonKategori(onPressed: () {}, label: "Reptile"),
                    SizedBox(
                      width: 3,
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
