# 🧩 Minimal Design System (Tailwind + shadcn/ui)

## 1. 🎯 Mục tiêu

Xây dựng một design system:

- Tối giản, dễ maintain
- Performance cao (ưu tiên mobile)
- Đồng bộ với shadcn/ui
- Dễ scale cho production

---

## 2. 🎨 Design Tokens

### Colors

```css
:root {
  --background: #050510;
  --foreground: #f8fafc;

  --card: #0b0b1a;
  --border: #1a1a2e;

  --primary: #8b5cf6;
  --primary-foreground: #ffffff;

  --muted: #94a3b8;
}
```

### Principles

- Không dùng quá 5–6 màu chính
- Tránh gradient nặng
- Ưu tiên contrast cao (dark UI)

---

## 3. 🔤 Typography

### Font

- Inter (system fallback)

### Scale

| Type  | Size | Weight |
| ----- | ---- | ------ |
| H1    | 32px | 600    |
| H2    | 24px | 600    |
| H3    | 20px | 500    |
| Body  | 16px | 400    |
| Small | 14px | 400    |

### Rules

- Line-height: 1.5
- Không dùng quá 2 font-weight/section

---

## 4. 📦 Layout System

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Spacing scale (Tailwind)

- 4 → 8 → 12 → 16 → 24 → 32

---

## 5. 🧱 Core Components

### Card

```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}
```

---

### Button

#### Variants

- primary
- ghost
- outline

```tsx
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

#### Rules

- Height: 40px–48px
- Border radius: 0.75rem
- Transition: 0.2s ease

---

### Input

```tsx
<Input placeholder="Enter something..." />
```

Rules:

- Border nhẹ
- Focus rõ (ring)
- Không shadow nặng

---

## 6. ⚡ Motion System

### Nguyên tắc

- Chỉ animate:
  - transform
  - opacity

- Không dùng:
  - blur
  - box-shadow lớn

### Classes

```css
.smooth {
  transition: all 0.25s ease;
}
```

---

## 7. 🌑 Background Style

```css
body {
  background: radial-gradient(circle at top, #1a1a3a 0%, #050510 60%);
}
```

---

## 8. 📱 Performance Rules

### BẮT BUỘC

- Không dùng backdrop-filter lớn
- Không spam will-change
- Không disable scrollbar toàn bộ
- Hover phải disable trên mobile

```css
@media (hover: none) {
  .card:hover {
    transform: none;
  }
}
```

---

## 9. 🧠 Tailwind Config

```ts
export default {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--primary)",
        muted: "var(--muted)",
      },
    },
  },
};
```

---

## 10. 🧩 Component Philosophy

- Mỗi component = 1 trách nhiệm
- Không style inline phức tạp
- Ưu tiên reusable

---

## 11. 🚫 Anti-patterns (TRÁNH)

- Glassmorphism nặng (blur 20px+)
- Shadow quá lớn
- Animation vô nghĩa
- CSS dài > 300 dòng cho 1 file
- Override Tailwind quá nhiều

---

## 12. ✅ Checklist trước khi ship

- [ ] Mobile mượt
- [ ] Scroll không lag
- [ ] Không dùng blur nặng
- [ ] Component reuse được
- [ ] Lighthouse performance > 85

---

## 13. 🔧 Stack đề xuất

- TailwindCSS
- shadcn/ui
- Framer Motion (optional, nhẹ)

---

## 14. 🧭 Guiding Principle

> “Ít hơn nhưng chuẩn hơn.”
>
> UI không cần gây ấn tượng.
> Nó cần chạy mượt và không làm người dùng khó chịu.

---

## 15. 📌 Dev Notes

- Ưu tiên trải nghiệm thực tế hơn demo đẹp
- Test trên mobile trước desktop
- Nếu thấy “cool” → kiểm tra lại performance

---
