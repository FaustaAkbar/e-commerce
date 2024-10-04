import 'package:flutter/material.dart';

class ButtonKategori extends StatelessWidget {
  final Function()? onPressed;
  final String label;

  const ButtonKategori({
    super.key,
    required this.onPressed,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed, // Menangani klik
      highlightColor: Colors.deepPurple, // Warna saat tombol ditekan
      splashColor: Colors.deepPurple.withOpacity(0.2), // Efek ripple (opsional)
      child: Padding(
        padding: const EdgeInsets.all(14.0), // Padding kiri 16
        child: Text(
          label,
          style: TextStyle(fontSize: 19),
        ), // Menampilkan teks
      ),
    );
  }
}
