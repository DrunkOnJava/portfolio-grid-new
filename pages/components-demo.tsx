import { useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import Tooltip from '@/components/Tooltip';
import Tabs from '@/components/Tabs';
import Dropdown from '@/components/Dropdown';
import Animation from '@/components/Animation';
import Loading from '@/components/Loading';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import Progress from '@/components/Progress';
import Skeleton, { SkeletonGroup } from '@/components/Skeleton';

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const sampleImages = [
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?w=800',
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=800',
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?w=800',
  ];

  const tabContent = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-4">
          <p>These are the new UI components added to your portfolio.</p>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h4 className="font-semibold mb-2">Card Component</h4>
              <p className="text-sm text-gray-600">A container with hover effects</p>
            </Card>
            <Card hoverable onClick={() => alert('Card clicked!')}>
              <h4 className="font-semibold mb-2">Hoverable Card</h4>
              <p className="text-sm text-gray-600">Click me!</p>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'buttons',
      label: 'Buttons',
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <Button fullWidth>Full Width Button</Button>
          <Button as="link" href="/">Link as Button</Button>
        </div>
      )
    },
    {
      id: 'badges',
      label: 'Badges',
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge size="sm">Small Badge</Badge>
            <Badge size="md">Medium Badge</Badge>
          </div>
        </div>
      )
    }
  ];

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Component Library</h1>
        
        <div className="grid gap-8">
          {/* Tabs Demo */}
          <Card className="bg-secondary border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Components Showcase</h2>
            <Tabs tabs={tabContent} defaultTab="overview" />
          </Card>

          {/* Interactive Components */}
          <Card className="bg-secondary border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Interactive Components</h2>
            
            <div className="space-y-6">
              {/* Dropdown */}
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-300">Dropdown</h3>
                <Dropdown
                  options={dropdownOptions}
                  value={selectedValue}
                  onChange={setSelectedValue}
                  placeholder="Select an option"
                  className="max-w-xs"
                />
                {selectedValue && (
                  <p className="mt-2 text-sm text-gray-400">Selected: {selectedValue}</p>
                )}
              </div>

              {/* Tooltip */}
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-300">Tooltips</h3>
                <div className="flex gap-4">
                  <Tooltip content="This is a tooltip!" placement="top">
                    <Button variant="outline">Hover me (top)</Button>
                  </Tooltip>
                  <Tooltip content="Right placement" placement="right">
                    <Button variant="outline">Hover me (right)</Button>
                  </Tooltip>
                  <Tooltip content="Bottom placement" placement="bottom">
                    <Button variant="outline">Hover me (bottom)</Button>
                  </Tooltip>
                </div>
              </div>

              {/* Modal */}
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-300">Modal</h3>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Example Modal"
                >
                  <p className="text-gray-600 mb-4">
                    This is a modal dialog. Click outside or press ESC to close.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Card>

          {/* New Components Section */}
          <Card className="bg-secondary border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Animation & Loading Components</h2>
            
            <div className="space-y-8">
              {/* Animation Examples */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-300">Scroll Animations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Animation animateIn="fadeInUp" delay={0}>
                    <Card className="h-24 flex items-center justify-center">
                      <p>Fade In Up</p>
                    </Card>
                  </Animation>
                  <Animation animateIn="fadeInLeft" delay={100}>
                    <Card className="h-24 flex items-center justify-center">
                      <p>Fade In Left</p>
                    </Card>
                  </Animation>
                  <Animation animateIn="zoomIn" delay={200}>
                    <Card className="h-24 flex items-center justify-center">
                      <p>Zoom In</p>
                    </Card>
                  </Animation>
                </div>
              </div>

              {/* Loading Indicators */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-300">Loading States</h3>
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <Loading size="sm" className="text-blue-500" />
                    <p className="text-xs mt-2 text-gray-400">Small</p>
                  </div>
                  <div className="text-center">
                    <Loading size="md" className="text-green-500" />
                    <p className="text-xs mt-2 text-gray-400">Medium</p>
                  </div>
                  <div className="text-center">
                    <Loading size="lg" className="text-purple-500" />
                    <p className="text-xs mt-2 text-gray-400">Large</p>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-300">Progress Indicators</h3>
                <div className="space-y-3">
                  <Progress value={25} showLabel />
                  <Progress value={50} variant="success" showLabel />
                  <Progress value={75} variant="warning" showLabel animated />
                  <Progress value={90} variant="error" size="lg" showLabel />
                </div>
              </div>

              {/* Skeleton Loading */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-300">Skeleton Loading States</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSkeleton(!showSkeleton)}
                  className="mb-4"
                >
                  Toggle Skeleton
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showSkeleton ? (
                    <>
                      <Card>
                        <div className="flex items-center space-x-3">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="flex-1">
                            <Skeleton height={20} className="mb-2" />
                            <Skeleton height={16} width="60%" />
                          </div>
                        </div>
                      </Card>
                      <Card>
                        <Skeleton variant="rectangular" height={100} className="mb-3" />
                        <SkeletonGroup count={2} />
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card>
                        <div className="flex items-center space-x-3">
                          <img src="https://via.placeholder.com/40" className="rounded-full" />
                          <div>
                            <h4 className="font-semibold">John Doe</h4>
                            <p className="text-sm text-gray-600">Designer</p>
                          </div>
                        </div>
                      </Card>
                      <Card>
                        <img src="https://via.placeholder.com/300x100" className="w-full mb-3" />
                        <p>Content loaded!</p>
                        <p className="text-sm text-gray-600">This is the actual content.</p>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-300">Image Gallery Modal</h3>
                <p className="text-sm text-gray-400 mb-4">Click to open a gallery with keyboard navigation</p>
                <Button onClick={() => setGalleryOpen(true)}>Open Gallery</Button>
                <ImageGalleryModal
                  visible={galleryOpen}
                  onClose={() => setGalleryOpen(false)}
                  images={sampleImages}
                  title="Sample Gallery"
                  captions={[
                    'Beautiful landscape photo',
                    'Adorable puppies playing',
                    'Stunning mountain view'
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Usage Examples */}
          <Card className="bg-secondary border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Usage in Your Portfolio</h2>
            <div className="space-y-4 text-gray-300">
              <p>These components are already being used in:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>ProjectCard</strong> - Uses Badge for tags and Tooltip for status</li>
                <li><strong>UploadModal</strong> - Uses Modal and Card components</li>
              </ul>
              <p className="mt-4">You can integrate them further by:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Replace filter buttons with the Dropdown component</li>
                <li>Use Tabs for organizing project categories</li>
                <li>Replace all buttons with the new Button component</li>
                <li>Add Tooltips to provide more context</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}