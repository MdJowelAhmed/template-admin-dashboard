import React, { useState } from 'react'
import { Shield, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'

const defaultPrivacy = `# Privacy Policy

Last updated: January 2024

## 1. Information We Collect

We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

## 2. How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send you technical notices and support messages
- Respond to your comments and questions

## 3. Information Sharing

We do not share your personal information with third parties except:
- With your consent
- For legal reasons
- To protect rights and safety

## 4. Data Security

We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.

## 5. Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Object to processing of your data

## 6. Cookies

We use cookies and similar technologies to collect information about your browsing activities.

## 7. Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.

## 8. Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@example.com.`

export default function PrivacySettings() {
  const [privacy, setPrivacy] = useState(defaultPrivacy)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast({
      title: 'Privacy Policy Updated',
      description: 'Privacy Policy has been updated successfully.',
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
            <Shield className="h-5 w-5 text-primary" />
            Privacy Policy
          </CardTitle>
          <CardDescription>
            Manage your platform's Privacy Policy. Supports Markdown formatting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            placeholder="Enter your privacy policy..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {privacy.length} characters
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setPrivacy(defaultPrivacy)}>
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
            This is how your Privacy Policy will appear to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {privacy}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

