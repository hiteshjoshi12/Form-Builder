# 🌟 Growform - A Drag & Drop Form Builder

A full-featured, responsive, and theme-switchable (dark/light) form builder built with **React Remix** and **Tailwind CSS**. Growform allows users to build, preview, save, and share multi-step forms with a clean and intuitive drag-and-drop interface.

---

## 🚀 Features

- 🧱 Drag-and-drop field creation
- 🧩 Supports multiple field types (text, textarea, dropdown, checkbox, radio, date, file, image, etc.)
- 🧭 Multi-step forms with step navigation
- ✨ Real-time live preview (desktop, tablet, mobile modes)
- 💾 Auto-save and manual save to `localStorage`
- 🗂 Template save/load system
- 🔗 Shareable form links (generated with unique IDs)
- 🌘 Dark mode and light mode toggle
- ⚡ Responsive design with mobile, tablet, and desktop layouts

---

## 🛠 Tech Stack

- **Framework:** [Remix](https://remix.run/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Heroicons](https://heroicons.com/)
- **Drag & Drop:** [@dnd-kit](https://github.com/clauderic/dnd-kit)
- **ID Generation:** [nanoid](https://github.com/ai/nanoid)
- **Toasts:** [react-hot-toast](https://react-hot-toast.com/)

---

## 📁 Project Structure

```
app/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Canvas.jsx
│   ├── DraggableField.jsx
│   ├── FieldConfigPanel.jsx
│   ├── GrowformPreview.jsx
│   ├── FormNameModal.jsx
├── routes/
│   ├── _index.jsx          # Homepage with form templates and shared forms
│   ├── builder.jsx         # Form builder page
│   ├── form/$id.jsx        # Shared form view (read-only)
├── styles/
│   └── tailwind.css
├── entry.client.jsx
├── entry.server.jsx
└── root.jsx
```

---

## 🧪 Usage

### 📦 Installation

```bash
npm install
```

### 🚴‍♂️ Run the project

```bash
npm run dev
```

Open your browser at: `http://localhost:3000`

---

## 🧰 Available Field Types

- Text input
- Textarea
- Dropdown
- Checkbox
- Radio
- Date picker
- File upload
- Image upload
- Signature
- Toggle

---

## 💡 Key Behaviors

- **Saving a form:** Use the `Save` button to store your current form fields to localStorage.
- **Publishing a form:** Creates a new shareable link (`/form/:id`) that others can open in read-only preview mode.
- **Dark Mode Toggle:** Button in the Navbar switches between light and dark themes.
- **Drag-and-drop interface:** Easily reorder or add fields by dragging from the sidebar to the canvas.

---

## 📤 Deployment

Deployed this project on Vercel 

-Link: https://form-builder-ten-mocha.vercel.app/

---

## ✍️ Author

- Built with ❤️ by Hitesh Joshi