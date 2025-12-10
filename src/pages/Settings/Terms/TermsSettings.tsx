import React, { useState } from 'react'
import { FileText, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'

const defaultTerms = `# Terms and Conditions

Last updated: January 2024

## 1. Introduction

Welcome to our Dashboard. By accessing or using our service, you agree to be bound by these Terms and Conditions.

## 2. Use License

Permission is granted to temporarily use our dashboard for personal, non-commercial transitory viewing only.

## 3. Disclaimer

The materials on our dashboard are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.

## 4. Limitations

In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our dashboard.

## 5. Revisions

We may revise these terms of service at any time without notice. By using this dashboard you are agreeing to be bound by the then current version.

## 6. Governing Law

These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.`

export default function TermsSettings() {
  const [terms, setTerms] = useState(defaultTerms)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast({
      title: 'Terms Updated',
      description: 'Terms and Conditions have been updated successfully.',
    })
    
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Terms & Conditions
          </CardTitle>
          <CardDescription>
            Manage your platform's Terms and Conditions. Supports Markdown formatting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Enter your terms and conditions..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {terms.length} characters
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setTerms(defaultTerms)}>
                Reset to Default
              </Button>
              <Button onClick={handleSave} isLoading={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
          <CardDescription>
            This is how your Terms & Conditions will appear to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {terms}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

