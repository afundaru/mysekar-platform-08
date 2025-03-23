
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Keanggotaan = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Keanggotaan</h1>
      <Card>
        <CardContent className="p-6">
          <p>Kelola data keanggotaan dan verifikasi pendaftaran.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const Forum = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Forum & Komunikasi</h1>
      <Card>
        <CardContent className="p-6">
          <p>Moderasi forum dan kirim pengumuman ke anggota.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const Pengaduan = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Pengaduan</h1>
      <Card>
        <CardContent className="p-6">
          <p>Tinjau laporan pengaduan dari anggota.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const Konsultasi = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Konsultasi Hukum</h1>
      <Card>
        <CardContent className="p-6">
          <p>Pantau percakapan AI dan distribusi kasus.</p>
        </CardContent>
      </Card>
    </div>
  );
};
