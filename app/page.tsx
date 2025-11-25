"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router

interface Recipe {
  id: number;
  title: string;
  shortDesc: string;
  desc: string;
  image?: string; // tambahkan field image opsional
}

export default function Home() {
  const router = useRouter(); // router dibuat di sini

  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "🍰 Bolu Strawberry",
      shortDesc: "Bolu lembut warna pink cantik dengan aroma segar strawberry",
      desc: "",
      image: "/bolustrawberry.png",
    },
    {
      id: 2,
      title: "🍡 Mochi Pink",
      shortDesc: "Mochi kenyal isi kacang merah favorit semua orang",
      desc: "",
      image: "/mochipink.png",
    },
    {
      id: 3,
      title: "🍨 Ice Cream Berry",
      shortDesc: "Ice cream homemade creamy rasa berry segar",
      desc: "",
      image: "/icecreamberry.png",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddRecipe = () => {
    if (!newTitle || !newShortDesc || !newDesc) {
      alert("Mohon isi semua field ya 💗");
      return;
    }

    const newRecipe: Recipe = {
      id: recipes.length + 1,
      title: newTitle,
      shortDesc: newShortDesc,
      desc: newDesc,
      image: newImage || undefined,
    };

    setRecipes([...recipes, newRecipe]);
    setNewTitle("");
    setNewShortDesc("");
    setNewDesc("");
    setNewImage(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <main>
      {/* HEADER */}
      <header
        style={{ backgroundColor: "#FFD6E7" }}
        className="py-20 w-full flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl font-extrabold text-black mb-3 text-center">
          Resep Makanan Manis 💗
        </h1>
        <p className="text-2xl font-bold text-black text-center">
          Vivian Carolina - 535240060
        </p>
      </header>

      <section className="container mt-10">
        <p className="text-center mb-10">
          Koleksi resep dessert manis dan mudah dibuat untuk menemani hari-harimu 🍓✨
        </p>

        <div className="text-center mb-10">
          <button className="button" onClick={() => setShowForm(!showForm)}>
            + Tambah Resep
          </button>
        </div>

        {showForm && (
          <div className="card mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Tambah Resep Baru 💗
            </h2>

            <input
              type="text"
              placeholder="Nama Resep"
              className="input mb-6"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            {/* UPLOAD GAMBAR */}
            <input
              type="file"
              accept="image/*"
              className="input mb-6"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setNewImage(reader.result as string); // simpan data base64
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <input
              type="text"
              placeholder="Deskripsi Singkat"
              className="input mb-6"
              value={newShortDesc}
              onChange={(e) => setNewShortDesc(e.target.value)}
            />

            <textarea
              placeholder="Cara Membuat (Langkah-langkah)"
              className="input h-28 mb-6"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />

            <button className="button w-full" onClick={handleAddRecipe}>
              Simpan Resep
            </button>
          </div>
        )}

        {/* LIST CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="rounded-2xl mb-3"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm mb-4">{recipe.shortDesc}</p>

              <div className="flex gap-3">
                <button
                  className="button"
                  onClick={() => {
                    if (recipe.id === 1) router.push("/recipes/bolu-strawberry");
                    else if (recipe.id === 2) router.push("/recipes/mochi-pink");
                    else if (recipe.id === 3) router.push("/recipes/ice-cream-berry");
                    else alert(`Lihat resep untuk ${recipe.title} sedang dibuat 💗`);
                  }}
                >
                  Lihat Resep
                </button>

                <button
                  className="button"
                  style={{ backgroundColor: "#ff6b81" }}
                  onClick={() => handleDelete(recipe.id)}
                >
                  Hapus Resep
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}