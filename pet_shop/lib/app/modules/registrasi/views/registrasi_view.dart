import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/registrasi_controller.dart';

class RegistrasiView extends GetView<RegistrasiController> {
  const RegistrasiView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RegistrasiView'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'RegistrasiView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
