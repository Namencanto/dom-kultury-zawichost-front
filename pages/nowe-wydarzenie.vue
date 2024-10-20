<template>
  <div class="max-w-4xl mx-auto py-6 px-4 lg:px-8 bg-white">
    <h1
      class="text-4xl lg:text-5xl font-extrabold text-center leading-tight mb-6"
    >
      {{ isEditing ? "Edytuj Wydarzenie" : "Dodaj Wydarzenie" }}
    </h1>
    <div class="bg-gray-100 p-4 rounded-lg mb-6 shadow">
      <h2 class="text-lg font-bold mb-2">
        Instrukcja korzystania z formularza:
      </h2>
      <ul class="list-disc list-inside text-sm text-gray-700">
        <li>
          <strong>Nazwa Wydarzenia</strong>: Wprowadź nazwę wydarzenia w polu
          tekstowym. Pole wymagane.
        </li>
        <li>
          <strong>Data Wydarzenia</strong>: Wybierz datę i godzinę wydarzenia.
        </li>
        <li>
          <strong>Data Publikacji</strong>: Automatycznie ustawiona na
          dzisiejszą datę, ale można ją zmienić.
        </li>
        <li>
          <strong>Główny Nagłówek</strong>: Opcjonalny, ale pomaga wyróżnić
          wydarzenie.
        </li>
        <li><strong>Podtytuł</strong>: Opcjonalny podtytuł wydarzenia.</li>
        <li>
          <strong>Sekcja</strong>: Wybierz istniejącą sekcję lub dodaj nową.
        </li>
        <li>
          <strong>Opis Wydarzenia</strong>: Użyj edytora tekstu, aby dodać pełny
          opis.
        </li>
        <li>
          <strong>Zdjęcia Wydarzenia</strong>: Prześlij zdjęcia związane z
          wydarzeniem. Ustaw jedno jako główne.
        </li>
        <li>
          <strong>Zapisz Wydarzenie</strong>: Kliknij "Dodaj Wydarzenie" lub
          "Zaktualizuj Wydarzenie".
        </li>
      </ul>
    </div>

    <form @submit.prevent="submitForm" class="mb-12">
      <div class="mb-4">
        <label for="eventName" class="block font-semibold"
          >Nazwa Wydarzenia:</label
        >
        <input
          v-model="eventData.title"
          type="text"
          id="eventName"
          required
          class="input"
        />
      </div>

      <div class="mb-4">
        <label for="eventDate" class="block font-semibold"
          >Data Wydarzenia:</label
        >
        <input
          v-model="eventData.eventDate"
          type="datetime-local"
          id="eventDate"
          required
          class="input"
        />
      </div>

      <div class="mb-4">
        <label for="publishDate" class="block font-semibold"
          >Data Publikacji:</label
        >
        <input
          v-model="eventData.publishDate"
          type="date"
          id="publishDate"
          required
          class="input"
        />
      </div>

      <div class="mb-4">
        <label for="mainHeading" class="block font-semibold"
          >Główny nagłówek:</label
        >
        <input
          v-model="headings.mainHeading"
          type="text"
          id="mainHeading"
          class="input"
        />
      </div>
      <div class="mb-4">
        <label for="subHeading" class="block font-semibold">Podtytuł:</label>
        <input
          v-model="headings.subHeading"
          type="text"
          id="subHeading"
          class="input"
        />
      </div>
      <!-- Dropdown dla sekcji -->
      <div class="mb-4">
        <label for="sectionHeading" class="block font-semibold">Sekcja:</label>
        <select v-model="headings.sectionHeading" class="input mb-2">
          <option
            v-for="(section, index) in uniqueSections"
            :key="index"
            :value="section"
          >
            {{ section }}
          </option>
          <option value="">Inne...</option>
        </select>
        <!-- Pole do wpisania własnej sekcji -->
        <input
          v-if="!uniqueSections.includes(headings.sectionHeading)"
          v-model="headings.sectionHeading"
          type="text"
          id="sectionHeading"
          class="input mt-2"
          placeholder="Dodaj nową sekcję"
        />
      </div>

      <div class="mb-4">
        <label for="eventDescription" class="block font-semibold"
          >Opis Wydarzenia:</label
        >
        <EditorContent :editor="editor" class="editor border p-3 rounded-lg" />
      </div>

      <div class="mb-4">
        <label for="eventImages" class="block font-semibold"
          >Zdjęcia Wydarzenia:</label
        >
        <input
          type="file"
          @change="handleImageUpload"
          id="eventImages"
          multiple
          class="input"
        />
      </div>

      <!-- Selected Images Preview -->
      <div v-if="uploadedImages.length > 0" class="mb-4">
        <h3 class="font-semibold mb-2">Wybrane zdjęcia:</h3>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="image-item flex flex-col items-center"
          >
            <img
              :src="image.preview"
              :alt="image.alt || 'Obraz ' + (index + 1)"
              class="w-full h-24 object-cover rounded-md mb-2"
            />
            <input
              v-model="image.alt"
              type="text"
              placeholder="Dodaj opis alt"
              class="input mb-2"
            />
            <button type="button" @click="setAsMainImage(index)" class="btn">
              {{ image.isMain ? "Główne zdjęcie" : "Ustaw jako główne" }}
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Zaktualizuj Wydarzenie" : "Dodaj Wydarzenie" }}
      </button>
    </form>

    <!-- Live Preview -->
    <article
      v-if="eventData.title"
      class="bg-white p-6 lg:px-8 border-t border-gray-300"
    >
      <!-- Header -->
      <header class="mb-12" v-if="mainImage">
        <div class="relative">
          <img
            :src="mainImage.preview"
            :alt="mainImage.alt || 'Podgląd głównego zdjęcia'"
            class="w-full h-[400px] lg:h-[500px] object-cover cursor-pointer transition-transform duration-500 rounded-lg"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h1
              class="text-4xl lg:text-5xl font-extrabold text-white text-center leading-tight"
            >
              {{ eventData.title }}
            </h1>
          </div>
        </div>
      </header>

      <!-- Dates -->
      <div class="flex justify-start gap-4 mb-6 text-sm text-gray-600">
        <p>
          <span class="font-semibold">Data publikacji:</span>
          {{ formatDate(eventData.publishDate) }}
        </p>
        <p>
          <span class="font-semibold">Data wydarzenia:</span>
          {{ formatDate(eventData.eventDate) }}
        </p>
      </div>

      <!-- Content -->
      <div class="prose max-w-none text-lg text-gray-900 leading-relaxed mb-12">
        <h1
          v-if="headings.mainHeading"
          class="text-3xl lg:text-4xl font-bold mb-6"
        >
          {{ headings.mainHeading }}
        </h1>
        <h2 v-if="headings.subHeading" class="text-2xl font-semibold mb-4">
          {{ headings.subHeading }}
        </h2>
        <h3 v-if="headings.sectionHeading" class="text-xl font-semibold mb-3">
          {{ headings.sectionHeading }}
        </h3>
        <div v-html="eventData.description" class="mt-4"></div>
      </div>
    </article>
  </div>
</template>


<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { useRoute } from "vue-router";
import imageCompression from "browser-image-compression";

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      eventData: {
        title: "",
        eventDate: "",
        publishDate: new Date().toISOString().split("T")[0],
        description: "",
        images: [],
        thumbnail: null,
      },
      headings: {
        mainHeading: "",
        subHeading: "",
        sectionHeading: "",
      },
      uploadedImages: [],
      mainImage: null,
      editor: null,
      isEditing: false,
      originalPath: "",
      uniqueSections: [],
    };
  },
  async mounted() {
    const route = useRoute();
    const path = route.query.path;

    if (path) {
      this.isEditing = true;
      this.originalPath = path;
      await this.loadEventData(path);
    }
    this.initializeEditor();

    await this.fetchUniqueSections();
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  methods: {
    async fetchUniqueSections() {
      try {
        const result = await queryContent("aktualnosci").find();

        if (result && Array.isArray(result)) {
          const sectionsSet = new Set();
          result.forEach((item) => {
            if (item.content && Array.isArray(item.content)) {
              item.content
                .filter(
                  (block) => block.type === "heading" && block.level === 3
                )
                .forEach((block) => sectionsSet.add(block.text));
            }
          });
          this.uniqueSections = Array.from(sectionsSet);
        } else {
          console.error("Brak danych lub dane nie są tablicą.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania unikalnych sekcji:", error);
      }
    },
    initializeEditor() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Bold,
          Italic,
          Underline,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Image.configure({ inline: true }),
        ],
        content: this.eventData.description,
        onUpdate: ({ editor }) => {
          this.eventData.description = editor.getHTML();
          this.syncImageOrderWithEditor();
        },
      });
    },
    syncImageOrderWithEditor() {
      const htmlContent = this.editor.getHTML();
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;

      const imageElements = tempElement.querySelectorAll("img");

      const newOrder = Array.from(imageElements).map((img) => {
        const relativeSrc = new URL(img.src, window.location.origin).pathname;
        return this.uploadedImages.find((image) => {
          const imageSrc = new URL(image.preview, window.location.origin)
            .pathname;
          return imageSrc === relativeSrc;
        });
      });

      this.uploadedImages = newOrder.filter((img) => img !== undefined);
    },
    async loadEventData(path) {
      try {
        const data = await queryContent(path).findOne();

        this.eventData.title = data.title;
        this.eventData.eventDate = data.eventDate;
        this.eventData.publishDate = data.publishDate;
        if (data.thumbnail) {
          const urlParts = data.thumbnail.split("/");
          this.eventData.thumbnail = urlParts[urlParts.length - 1];
        }

        this.headings.mainHeading =
          data.content.find(
            (block) => block.type === "heading" && block.level === 1
          )?.text || "";
        this.headings.subHeading =
          data.content.find(
            (block) => block.type === "heading" && block.level === 2
          )?.text || "";
        this.headings.sectionHeading =
          data.content.find(
            (block) => block.type === "heading" && block.level === 3
          )?.text || "";

        this.eventData.description = data.content
          .filter((block) => block.type === "paragraph")
          .map((block) => `<p>${block.text}</p><br/>`)
          .join("");

        this.uploadedImages = data.content
          .filter((block) => block.type === "image")
          .map((img) => {
            this.eventData.description += `<img src="${img.src}" alt="${img.alt || ""}" style="display: block; margin: 0 auto;"/><br/>`;
            return {
              file: null,
              preview: img.src,
              alt: img.alt,
              isMain: img.src === data.thumbnail,
            };
          });

        this.mainImage = this.uploadedImages.find((img) => img.isMain) || null;

        this.editor.commands.setContent(this.eventData.description);
      } catch (error) {
        console.error("Błąd podczas ładowania danych aktualności:", error);
      }
    },
    async submitForm() {
      const formData = new FormData();

      formData.append("title", this.eventData.title);
      formData.append("eventDate", this.eventData.eventDate);
      formData.append("publishDate", this.eventData.publishDate);
      formData.append("mainHeading", this.headings.mainHeading);
      formData.append("subHeading", this.headings.subHeading);
      formData.append("sectionHeading", this.headings.sectionHeading);
      formData.append("description", this.eventData.description);

      const totalSize = this.uploadedImages.reduce((acc, image) => {
        return acc + (image.file ? image.file.size : 0);
      }, 0);

      if (totalSize > 4.5 * 1024 * 1024) {
        alert("Wydarzenie zawiera zbyt dużo zdjęć");
        return;
      }

      this.uploadedImages.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        }
        if (image.alt) {
          formData.append(`imageAlt[${index}]`, image.alt);
        }
      });

      const mainImageIndex = this.uploadedImages.findIndex((img) => img.isMain);
      if (mainImageIndex !== -1) {
        formData.append("mainImageOrder", mainImageIndex);
      }

      if (this.eventData.thumbnail) {
        formData.append("thumbnail", this.eventData.thumbnail);
      }

      const url = this.isEditing ? `/api/edit-event` : `/api/add-event`;

      if (this.isEditing && this.originalPath) {
        formData.append("path", this.originalPath);
      }

      try {
        const response = await fetch(url, {
          method: this.isEditing ? "PATCH" : "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json();
          alert(
            this.isEditing
              ? "Wydarzenie zostało zaktualizowane!"
              : "Wydarzenie zostało dodane!"
          );
          this.$router.push("/aktualnosci");
        } else {
          const errorData = await response.json();
          console.error("Błąd podczas zapisu:", errorData.error);
          alert("Wystąpił błąd podczas zapisu wydarzenia.");
        }
      } catch (error) {
        console.error("Błąd podczas komunikacji z API:", error);
        alert("Nie udało się zapisać wydarzenia.");
        this.$router.push("/admin");
      }
    },
    addImageToEditor(imageUrl, altText) {
      this.editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: altText })
        .run();
    },

    async handleImageUpload(event) {
      const files = event.target.files;
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };

      for (const file of files) {
        const altText = prompt(`Podaj tekst alternatywny dla obrazu ${file.name}:`);

        try {
          const compressedFile = await imageCompression(file, options);

          if (compressedFile.size > 400 * 1024) {
            alert(
              `Obraz ${file.name} jest zbyt duży nawet po kompresji. Zostanie pominięty.`
            );
            continue;
          }

          const imagePreview = await imageCompression.getDataUrlFromFile(
            compressedFile
          );

          this.uploadedImages.push({
            file: compressedFile,
            preview: imagePreview,
            alt: altText || "Inline image",
            isMain: false,
          });

          this.addImageToEditor(imagePreview, altText);

          if (this.uploadedImages.length === 1) {
            this.setAsMainImage(0);
          }
        } catch (error) {
          console.error("Błąd podczas kompresji obrazu:", error);
          alert(`Nie udało się przetworzyć obrazu ${file.name}.`);
        }
      }
    },

    setAsMainImage(index) {
      this.uploadedImages.forEach((image, idx) => {
        image.isMain = idx === index;
      });
      this.mainImage = this.uploadedImages[index];

      if (this.mainImage.file) {
        this.eventData.thumbnail = this.mainImage.file.name;
      } else if (this.mainImage.preview) {
        const urlParts = this.mainImage.preview.split("/");
        this.eventData.thumbnail = urlParts[urlParts.length - 1];
      } else {
        this.eventData.thumbnail = null;
      }
    },
    toggleBold() {
      this.editor.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },
    toggleUnderline() {
      this.editor.chain().focus().toggleUnderline().run();
    },
    setTextAlign(alignment) {
      this.editor.chain().focus().setTextAlign(alignment).run();
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
<style scoped>
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editor {
  min-height: 200px;
}

.btn {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.italic {
  font-style: italic;
}

.underline {
  text-decoration: underline;
}

.editor img {
  display: block;
  margin: 0 auto;
}

.prose img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

.image-item img {
  display: block;
  margin: 0 auto;
}
</style>
