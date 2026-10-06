import ProjectCanvas from '@/app/appComponents/projectDetails/ProjectCanvas'
import ProjectHeader from '@/app/appComponents/projectDetails/ProjectHeader'
import ProjectSettings from '@/app/appComponents/projectDetails/ProjectSettings'
import React from 'react'

const ProjectDetailPage = () => {
  return (
    <div className='w-full flex flex-col gap-0'>
        <ProjectHeader/>
        <div className="flex items-start gap-0">
            <ProjectSettings/>
            <ProjectCanvas/>
        </div>
    </div>
  )
}

export default ProjectDetailPage