import { Fragment } from 'react'
import { Button, Card, Input, Table } from '@heroui/react'
import { ProjectListTable } from '@/components/ProjectListTable'
import { ProjectActivityLog } from '@/components/ProjectActivityLog'
import { ProjectHeader } from '@/components/ProjectHeader'
import { PicChips } from '@/components/PicChips'
import { StatusSelect } from '@/components/StatusSelect'
import { addDays } from '@/lib/dates'
import { buildNewProjectMessage, waLink } from '@/lib/whatsapp'
import { useAppStore } from '@/store/appStore'

const OFFSET_PRESETS = [-7, -5, -3, -1, 0] as const

export function ProjectsPage() {
  const projects = useAppStore((s) => s.projects)
  const selectedProjectId = useAppStore((s) => s.selectedProjectId)
  const pics = useAppStore((s) => s.pics)
  const selectProject = useAppStore((s) => s.selectProject)
  const deleteProject = useAppStore((s) => s.deleteProject)
  const setTaskStatus = useAppStore((s) => s.setTaskStatus)
  const updateTask = useAppStore((s) => s.updateTask)
  const addTask = useAppStore((s) => s.addTask)
  const removeTask = useAppStore((s) => s.removeTask)
  const saveProjectAsTemplate = useAppStore((s) => s.saveProjectAsTemplate)

  const project = projects.find((p) => p.id === selectedProjectId)

  if (!project) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Project</h2>
          <p className="text-sm text-foreground/60">Pilih project untuk mengatur task.</p>
        </div>
        {projects.length === 0 ? (
          <p className="text-sm text-foreground/60">Belum ada project.</p>
        ) : (
          <ProjectListTable projects={projects} />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ProjectHeader
        project={project}
        onBack={() => selectProject(null)}
        onSaveTemplate={() => {
          const name = prompt('Nama template baru', `${project.title} template`)
          if (name) saveProjectAsTemplate(project.id, name)
        }}
        onDelete={() => {
          if (confirm('Hapus project?')) deleteProject(project.id)
        }}
      />

      <Card className="op-panel overflow-hidden border border-border/70 p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
          <h2 className="text-sm font-semibold">Task</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="tertiary" onPress={() => addTask(project.id, 'Task baru', false)}>
              + Task
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => addTask(project.id, 'Task detil', true)}>
              + Detil
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onPress={() => {
                for (const picId of new Set(project.tasks.flatMap((t) => t.picIds))) {
                  const pic = pics.find((p) => p.id === picId)
                  if (!pic?.phone) continue
                  const tasks = project.tasks.filter((t) => t.picIds.includes(picId))
                  window.open(waLink(pic.phone, buildNewProjectMessage(project, pic, tasks)), '_blank')
                }
              }}
            >
              WA ke PIC
            </Button>
          </div>
        </div>
        <Table className="op-data-table op-task-table" variant="primary">
          <Table.ScrollContainer>
            <Table.Content aria-label={`Task ${project.title}`} className="min-w-[960px]">
              <Table.Header>
                <Table.Column isRowHeader>Tugas</Table.Column>
                <Table.Column>Deadline</Table.Column>
                <Table.Column>H relatif</Table.Column>
                <Table.Column>PIC</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column className="text-end w-24"> </Table.Column>
              </Table.Header>
              <Table.Body>
                {project.tasks.map((task) => (
                  <Fragment key={task.id}>
                    <Table.Row>
                      <Table.Cell>
                        <p className="font-medium">{task.title}</p>
                        {task.isDetailed ? (
                          <p className="text-xs text-foreground/45">{task.subTasks.length} sub-task</p>
                        ) : null}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          aria-label={`Deadline ${task.title}`}
                          className="max-w-[10rem]"
                          type="date"
                          value={task.deadline ?? ''}
                          onChange={(e) => updateTask(project.id, task.id, { deadline: e.target.value || undefined })}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-wrap gap-0.5">
                          {OFFSET_PRESETS.map((off) => (
                            <Button
                              key={off}
                              size="sm"
                              className="min-w-9 px-1.5"
                              variant={task.offsetDays === off ? 'primary' : 'tertiary'}
                              onPress={() =>
                                updateTask(project.id, task.id, {
                                  deadline: addDays(project.targetDate, off),
                                  offsetDays: off,
                                })
                              }
                            >
                              {off === 0 ? 'H' : `H${off}`}
                            </Button>
                          ))}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <PicChips
                          picIds={task.picIds}
                          pics={pics}
                          onToggle={(picId) => {
                            const has = task.picIds.includes(picId)
                            updateTask(project.id, task.id, {
                              picIds: has ? task.picIds.filter((x) => x !== picId) : [...task.picIds, picId],
                            })
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <StatusSelect
                          status={task.status}
                          onChange={(s) => setTaskStatus(project.id, task.id, s)}
                        />
                      </Table.Cell>
                      <Table.Cell className="text-end">
                        <Button size="sm" variant="danger-soft" onPress={() => removeTask(project.id, task.id)}>
                          Hapus
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    {task.isDetailed
                      ? task.subTasks.map((sub) => (
                          <Table.Row key={sub.id} className="op-sub-row">
                            <Table.Cell>
                              <p className="ps-3 text-sm text-foreground/75">{sub.title}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                aria-label={`Qty ${sub.title}`}
                                className="max-w-[7rem]"
                                placeholder="Qty"
                                value={sub.qty}
                                onChange={(e) =>
                                  updateTask(project.id, task.id, {
                                    subTasks: task.subTasks.map((s) =>
                                      s.id === sub.id ? { ...s, qty: e.target.value } : s,
                                    ),
                                  })
                                }
                              />
                            </Table.Cell>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell>
                              <StatusSelect
                                status={sub.status}
                                label={`Status ${sub.title}`}
                                onChange={(s) => setTaskStatus(project.id, task.id, s, sub.id)}
                              />
                            </Table.Cell>
                            <Table.Cell />
                          </Table.Row>
                        ))
                      : null}
                  </Fragment>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Card>

      <ProjectActivityLog project={project} />
    </div>
  )
}
