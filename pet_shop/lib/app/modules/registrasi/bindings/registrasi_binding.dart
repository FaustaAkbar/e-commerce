import 'package:get/get.dart';

import '../controllers/registrasi_controller.dart';

class RegistrasiBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RegistrasiController>(
      () => RegistrasiController(),
    );
  }
}
