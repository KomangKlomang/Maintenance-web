import { useState } from 'react'
import { Modal, useOverlayState } from '@heroui/react'
import { Layout } from '@/components/Layout'
import { NewProjectForm } from '@/components/NewProjectForm'
import { PinGate } from '@/components/PinGate'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { TemplatesPage } from '@/pages/TemplatesPage'
import { TimelinePage } from '@/pages/TimelinePage'
import { useAppStore } from '@/store/appStore'

export default function App() {
  const activeView = useAppStore((s) => s.activeView)
  const [showNew, setShowNew] = useState(false)
  const newProjectModal = useOverlayState({
    isOpen: showNew,
    onOpenChange: setShowNew,
  })

  const page =
    activeView === 'dashboard' ? (
      <DashboardPage />
    ) : activeView === 'projects' ? (
      <ProjectsPage />
    ) : activeView === 'timeline' ? (
      <TimelinePage />
    ) : activeView === 'templates' ? (
      <TemplatesPage />
    ) : (
      <SettingsPage />
    )

  return (
    <PinGate>
      <Layout onNewProject={() => setShowNew(true)}>{page}</Layout>
      {showNew ? (
        <Modal state={newProjectModal}>
          <Modal.Backdrop isDismissable>
            <Modal.Container scroll="inside" size="md">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>Project baru</Modal.Heading>
                  <Modal.CloseTrigger />
                </Modal.Header>
                <Modal.Body>
                  <NewProjectForm onDone={() => setShowNew(false)} />
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ) : null}
    </PinGate>
  )
}
