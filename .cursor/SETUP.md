# Cursor Configuration Setup

## ⏰ Dynamic Time Context
The `.cursorrules` file is configured to automatically use the CURRENT DATE and LATEST documentation. Cursor will use the actual current date when making recommendations, ensuring they stay relevant over time without manual updates.

## Important: File Location

**Cursor chỉ đọc `.cursorrules` và `.cursorignore` từ thư mục root của project**, không đọc từ thư mục con như `.cursor/`.

## File Organization

### Root Directory (Files Cursor Actually Reads)
- `.cursorrules` - **File chính** chứa tất cả rules và guidelines
- `.cursorignore` - **File chính** chứa ignore patterns

### `.cursor/` Directory (Documentation Only)
- `README.md` - Hướng dẫn sử dụng cấu hình
- `QUICK_REFERENCE.md` - Tham khảo nhanh
- `SETUP.md` - File này (giải thích cấu trúc)
- `.cursorrules` - **Bản backup/tài liệu** (không được Cursor đọc)
- `.cursorignore` - **Bản backup/tài liệu** (không được Cursor đọc)

**Lưu ý**: Các file trong `.cursor/` chỉ để tổ chức và tài liệu. Cursor chỉ sử dụng các file ở root.

## Updating Configuration

When updating Cursor configuration:

1. **Update files in root directory** - `.cursorrules` và `.cursorignore` ở root là files Cursor thực sự đọc
2. **Update files in `.cursor/` directory** - Có thể cập nhật để giữ đồng bộ (tùy chọn)
3. **No need to update dates manually** - The rules are configured to automatically use current dates and latest documentation

**Quan trọng**: Luôn chỉnh sửa file ở root vì đó là file Cursor sử dụng!

## Current Configuration Status

- ✅ Main files (`.cursorrules`, `.cursorignore`) ở root directory (Cursor đọc từ đây)
- ✅ Documentation files trong `.cursor/` directory
- ✅ Dynamic time context configured - Cursor will automatically use current dates
- ✅ Latest best practices được tham chiếu với cơ chế tự động cập nhật

## Maintenance

- Review and update configuration quarterly
- Update date references when making changes
- Keep documentation links current
- Sync root and `.cursor/` files when needed

