# 🚀 Quick Reference - React Bits Components

## Import Statement

```typescript
import {
  Button, Card, CardHeader, CardTitle, CardDescription, CardContent,
  Badge, Dialog, Tabs, TabsList, TabsTrigger, TabsContent,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Skeleton, useToast
} from '@/components/ui-bits';
```

## Button

```typescript
<Button variant="primary" size="md" onPress={() => {}}>
  Click Me
</Button>
```

**Variants:** `primary` | `secondary` | `outline` | `ghost` | `danger`
**Sizes:** `sm` | `md` | `lg`

## Card

```typescript
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Badge

```typescript
<Badge variant="success">Active</Badge>
```

**Variants:** `default` | `secondary` | `success` | `warning` | `danger` | `outline`

## Dialog

```typescript
<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Title"
  description="Description"
>
  Content
</Dialog>
```

## Tabs

```typescript
<Tabs defaultSelectedKey="tab1">
  <TabsList>
    <TabsTrigger id="tab1">Tab 1</TabsTrigger>
    <TabsTrigger id="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent id="tab1">Content 1</TabsContent>
  <TabsContent id="tab2">Content 2</TabsContent>
</Tabs>
```

## Table

```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Toast

```typescript
const { toast } = useToast();

toast({
  title: 'Success!',
  description: 'Operation completed',
  variant: 'success'
});
```

**Variants:** `default` | `success` | `error` | `info`

## Skeleton

```typescript
<Skeleton className="h-12 w-full" />
```

## Animation

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## Page Template

```typescript
import { motion } from 'framer-motion';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Button, Badge, useToast
} from '@/components/ui-bits';

export default function YourPage() {
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-nee-100 rounded-lg">
          <Icon className="w-6 h-6 text-nee-700" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Title</h1>
          <p className="text-gray-600">Description</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Your content */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

## Common Patterns

### Loading State
```typescript
{loading ? (
  <Skeleton className="h-12 w-full" />
) : (
  <div>Content</div>
)}
```

### Empty State
```typescript
{items.length === 0 && (
  <div className="p-12 text-center">
    <Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold mb-2">No items found</h3>
    <p className="text-gray-600">Description</p>
  </div>
)}
```

### Action Buttons
```typescript
<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Tertiary</Button>
</div>
```

## Key Differences from HTML

| HTML | React Bits |
|------|------------|
| `onClick` | `onPress` |
| `<input>` | Use native `<input>` with Tailwind classes |
| `value="..."` | `id="..."` (for Tabs) |

## Styling

All components accept `className` prop for custom Tailwind classes:

```typescript
<Button className="w-full mt-4">Full Width Button</Button>
<Card className="border-2 border-nee-500">Custom Border</Card>
```

## Colors

Use your existing `nee-*` color palette:
- `bg-nee-600` - Primary background
- `text-nee-700` - Primary text
- `border-nee-500` - Primary border
- `ring-nee-500` - Focus ring

## Responsive Design

Use Tailwind responsive prefixes:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## Testing Reformed Pages

- **Satellites:** http://localhost:5173/satellites
- **Settings:** http://localhost:5173/settings

---

**For detailed docs, see:** `REACT_BITS_REFORM.md`
