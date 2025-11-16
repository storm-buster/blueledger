# 📘 Page Reform Guide

This guide shows you how to reform each remaining page using the same modern patterns.

## General Reform Pattern

### 1. Import Modern Components
```typescript
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
```

### 2. Add State Management
```typescript
const [loading, setLoading] = useState(false);
const { toast } = useToast();
```

### 3. Wrap in Motion Container
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="p-6 space-y-6"
>
  {/* Content */}
</motion.div>
```

### 4. Use Modern Components
Replace HTML elements with shadcn/ui components.

---

## Page-by-Page Reform Guide

### 📊 HomePage Reform

**Current State:** Basic stats cards
**Target:** Animated stats with icons and trends

```typescript
// Add these imports
import { TrendingUp, Users, Leaf, Award } from 'lucide-react';

// Reform stats cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat, index) => (
    <motion.div
      key={stat.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {stat.title}
          </CardTitle>
          <stat.icon className="w-4 h-4 text-nee-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stat.value}</div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {stat.trend}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
```

---

### 📁 ProjectsPage Reform

**Current State:** Grid of project cards
**Target:** Filterable grid with modern cards

```typescript
// Add search and filters
<Card className="mb-6">
  <CardContent className="pt-6">
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
</Card>

// Modern project cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{project.id}</CardTitle>
              <CardDescription>{project.country}</CardDescription>
            </div>
            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Credits Issued</span>
              <span className="font-semibold">{project.creditsIssued}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Risk</span>
              <Badge variant="outline">{project.riskAssessment}</Badge>
            </div>
            
          </div>
          <Button 
            className="w-full mt-4" 
            variant="outline"
            onClick={() => onSelectProject(project)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
```

---

### 👤 KYCPage Reform

**Current State:** Table of accounts
**Target:** Modern table with status badges and actions

```typescript
// Add status badge helper
const getStatusBadge = (status: string) => {
  const variants = {
    'Done': 'default',
    'Pending': 'secondary',
    'In Process': 'outline'
  };
  return <Badge variant={variants[status]}>{status}</Badge>;
};

// Modern table
<Card>
  <CardHeader>
    <CardTitle>KYC Accounts</CardTitle>
    <CardDescription>Review and manage account verifications</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Registration</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.companyName}</TableCell>
            <TableCell>{account.accountType}</TableCell>
            <TableCell>{getStatusBadge(account.kycStatus)}</TableCell>
            <TableCell>{account.registrationDate}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Review
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

---

### ✅ ValidationPage Reform

**Current State:** Simple validation list
**Target:** Status-based tabs with actions

```typescript
<Tabs defaultValue="pending" className="space-y-6">
  <TabsList>
    <TabsTrigger value="pending">
      Pending ({pendingCount})
    </TabsTrigger>
    <TabsTrigger value="approved">
      Approved ({approvedCount})
    </TabsTrigger>
    <TabsTrigger value="rejected">
      Rejected ({rejectedCount})
    </TabsTrigger>
  </TabsList>

  <TabsContent value="pending">
    <Card>
      <CardContent className="pt-6">
        {/* Validation items */}
      </CardContent>
    </Card>
  </TabsContent>
  
  {/* Similar for other tabs */}
</Tabs>
```

---

### 🔍 VerificationPage Reform

**Current State:** Basic verification list
**Target:** Detailed cards with timeline

```typescript
<div className="space-y-4">
  {verifications.map((verification) => (
    <Card key={verification.projectId}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{verification.projectId}</CardTitle>
            <CardDescription>
              Cycle {verification.currentCycle} of verification
            </CardDescription>
          </div>
          <Badge>{verification.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Credits Recommended</p>
            <p className="text-lg font-semibold">{verification.creditsRecommended}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Buffer Deducted</p>
            <p className="text-lg font-semibold">{verification.bufferCreditsDeducted}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button variant="outline" size="sm">
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Report
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

---

### 🤖 XAIPage Reform

**Current State:** Basic file upload
**Target:** Modern upload with progress and results

```typescript
// File upload area
<Card>
  <CardHeader>
    <CardTitle>Upload Verification Media</CardTitle>
    <CardDescription>Upload selfie or video for liveness verification</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-sm text-gray-600 mb-2">
        Drag and drop your file here, or click to browse
      </p>
      <Input type="file" className="hidden" id="file-upload" />
      <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
        Choose File
      </Button>
    </div>
  </CardContent>
</Card>

// Results display
{results && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Liveness Score</p>
            <p className="text-2xl font-bold text-green-700">
              {(results.liveness.livenessScore * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Tree Count</p>
            <p className="text-2xl font-bold text-blue-700">
              {results.treeCount}
            </p>
          </div>
        </div>
        <Badge className="mt-4" variant={
          results.decisionCategory === 'Auto Pre-approve' ? 'default' : 'secondary'
        }>
          {results.decisionCategory}
        </Badge>
      </CardContent>
    </Card>
  </motion.div>
)}
```

---

### 🗺️ MapPage Reform

**Current State:** Basic map embed
**Target:** Interactive map with project markers

```typescript
<Card>
  <CardHeader>
    <CardTitle>Project Locations</CardTitle>
    <CardDescription>View all projects on the map</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="h-[600px] rounded-lg overflow-hidden">
      {/* Map component */}
    </div>
    
    {/* Project list sidebar */}
    <div className="mt-4 space-y-2">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{project.id}</p>
              <p className="text-sm text-gray-600">{project.country}</p>
            </div>
            <Badge>{project.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

---

## Common Patterns

### Loading States
```typescript
{loading ? (
  <div className="space-y-3">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
) : (
  // Your content
)}
```

### Empty States
```typescript
{items.length === 0 && (
  <div className="p-12 text-center">
    <Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No items found
    </h3>
    <p className="text-gray-600">
      Try adjusting your filters or search criteria
    </p>
  </div>
)}
```

### Action Buttons
```typescript
<div className="flex gap-2">
  <Button variant="default">Primary Action</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Tertiary</Button>
</div>
```

### Status Badges
```typescript
const statusVariants = {
  active: 'default',
  pending: 'secondary',
  completed: 'outline',
  rejected: 'destructive'
};

<Badge variant={statusVariants[status]}>{status}</Badge>
```

---

## Tips for Success

1. **Start Small** - Reform one section at a time
2. **Test Often** - Check the page after each change
3. **Use Existing Patterns** - Follow SatellitesPage and SettingsPage examples
4. **Keep It Consistent** - Use the same spacing, colors, and patterns
5. **Add Animations** - Use Framer Motion for smooth transitions
6. **Handle Errors** - Always add error states and toast notifications
7. **Think Mobile** - Ensure responsive design with Tailwind classes

---

## Need Help?

- Check `SatellitesPage.tsx` for table patterns
- Check `SettingsPage.tsx` for tab patterns
- Visit https://ui.shadcn.com for component docs
- Use `npx shadcn@latest add [component]` to add new components

Happy reforming! 🚀
