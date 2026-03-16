# 🔧 Lỗi Ghi Đè Dữ Liệu - Hotfix Applied

## Vấn đề

Khi thay đổi 1 ảnh bài viết, nội dung của bài khác bị hiển thị (cross-article data corruption).

## Root Causes Identified & Fixed

### 1. **API `/api/services` - Thêm Validation**

✅ **File:** `/api/services/route.ts`

- Thêm validation khi nhận slug: ensure không null/undefined
- Thêm check validate ID match: if `expectedID !== receivedID`, return 409 conflict error
- Thêm detailed logging để track request/response
- Tránh upsert blind - verify data integrity trước update

**Code Changes:**

```ts
// VALIDATION: Ensure slug exists
if (!slug || typeof slug !== "string" || slug.trim() === "") {
  return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
}

// VERIFY: Check ID match to prevent cross-article updates
const existing = await prisma.serviceContent.findUnique({ where: { slug } });
if (existing && id && existing.id !== id) {
  return NextResponse.json({ error: "ID mismatch" }, { status: 409 });
}
```

### 2. **useDraft Hook - Prevent Draft Mix-up**

✅ **File:** `/app/admin/hooks/useDraft.ts`

- Thêm `lastKeyRef` để track khi key thay đổi (prevent race condition)
- Only restore draft khi key THỰC SỰ thay đổi (not every render)
- Thêm validation: skip save nếu data không có `id` hoặc `slug`
- Thêm logging chi tiết để track draft restore/save
- Clear corrupted draft automaticallyautomatically

**Code Changes:**

```ts
const lastKeyRef = useRef(key); // Track last key to detect actual changes
// Only restore if key has actually changed
if (lastKeyRef.current === key) return;
lastKeyRef.current = key;

// Validation before save
if (!data.id && !data.slug) {
  console.warn(`Skipping save: data has no id or slug`);
  return;
}
```

### 3. **services_tab.tsx - Frontend Validation**

✅ **File:** `/app/admin/settings/components/services_tab.tsx` (pending - large replace needed)

- Thêm verification trước save: check selected.id có tồn tại trong list không
- Verify selected.slug match với original article
- Check response ID != sent ID → prevent silent data corruption
- Detailed logging mỗi save action

**Pending Code to Add in save():**

```ts
// Verify no orphaned articles
const originalArticle = list.find((item) => item.id === selected.id);
if (!originalArticle && !isCreatingMode) {
  return alert("Article not found - reload and try again");
}

// Verify response matches
if (savedData.id !== selected.id && !isCreatingMode) {
  return alert("Response ID mismatch - data may be corrupted");
}
```

## Logging Added for Debugging

When deployed, check browser console (F12) for:

1. `📤 [save] Sending data:` - What frontend sends
2. `📡 [POST /api/services] Received:` - What API receives
3. `❌ CRITICAL:` - Any mismatch detected
4. `📝 Draft auto-saved for` - When draft is saved
5. `✅ Restored draft for` - When draft is restored

## Testing Steps

1. Edit bài A - thêm ảnh
2. Chuyển sang bài B
3. Chuyển lại bài A - verify ảnh và nội dung vẫn đúng
4. Save bài A - verify không ghi đè sang bài B

## Still TODO

- [ ] Apply full validation in services_tab.tsx save() function (large replace needed due to format issues)
- [ ] Test on staging after deployment
- [ ] Monitor logs for any 409 conflicts or CRITICAL errors
