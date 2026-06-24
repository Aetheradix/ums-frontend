declare namespace Profile {
  // ── Field types supported by the dynamic renderer ──
  type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number';

  // ── A single field in a form section ──
  interface FieldConfig {
    /** The form state key this field maps to */
    field: string;
    /** Display label */
    label: string;
    /** Placeholder text */
    placeholder?: string;
    /** Input type — determines which component is rendered */
    type: FieldType;
    /** Whether the field is read-only */
    disabled?: boolean;
    /** For 'select' type: dropdown options */
    options?: { label: string; value: string | number }[];
    /** Grid column span (1, 2, or 3). Defaults to 1. */
    colSpan?: 1 | 2 | 3;
  }

  // ── A section within a tab (has an icon header + fields grid) ──
  interface SectionConfig {
    icon: string;
    title: string;
    description?: string;
    fields: FieldConfig[];
    /** Grid columns for this section (default: 3) */
    columns?: 2 | 3;
  }

  // ── A tab definition ──
  interface TabConfig {
    title: string;
    sections: SectionConfig[];
    /** Whether this tab has editable fields (shows Save/Cancel) */
    editable?: boolean;
    /** Submit button label override */
    submitLabel?: string;
  }

  // ── The full profile configuration per role ──
  interface Config {
    tabs: TabConfig[];
  }

  // ── Sidebar summary row ──
  interface SummaryRow {
    label: string;
    field: string;
  }

  // ── Sidebar configuration ──
  interface SidebarConfig {
    rows: SummaryRow[];
  }
}
