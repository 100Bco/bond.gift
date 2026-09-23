/**
 * Symbol B dùng như supergraphic. Không vẽ lại: crop trực tiếp phần symbol
 * từ file logo chính thức (/assets/bond-logo.png), giữ nguyên tỷ lệ.
 * Dùng tiết chế, không thay thế ảnh sản phẩm hay ảnh dự án.
 */
export function BondGlyph({ className = '' }: { className?: string }) {
  return <div className={`bond-glyph ${className}`.trim()} aria-hidden="true" />;
}
