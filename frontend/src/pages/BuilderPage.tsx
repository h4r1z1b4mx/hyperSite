import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderTree, ChevronRight, ChevronDown, FileText, File, ListTodo, Code, Eye } from 'lucide-react';
import Editor from "@monaco-editor/react";

interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  items?: FileItem[];
}

type Tab = 'code' | 'preview';

const BuilderPage = () => {
  const location = useLocation();
  const { prompt } = location.state || { prompt: '' };
  const [expandedFolders, setExpandedFolders] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('code');

  // Mock steps for demonstration
  const steps = [
    { id: 1, title: 'Initialize Project', status: 'completed' },
    { id: 2, title: 'Setup Dependencies', status: 'in-progress' },
    { id: 3, title: 'Generate Components', status: 'pending' },
    { id: 4, title: 'Create Styles', status: 'pending' },
    { id: 5, title: 'Optimize Assets', status: 'pending' },
  ];

  // Mock file structure with content
  const files: FileItem[] = [
    { 
      id: 1, 
      name: 'index.html', 
      type: 'file',
      content: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Generated Website</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>'
    },
    { 
      id: 2, 
      name: 'src', 
      type: 'folder',
      items: [
        { 
          id: 3, 
          name: 'App.tsx', 
          type: 'file',
          content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div>Hello World</div>\n  );\n}\n\nexport default App;'
        },
        { 
          id: 4, 
          name: 'components', 
          type: 'folder',
          items: [
            { 
              id: 5, 
              name: 'Header.tsx', 
              type: 'file',
              content: 'export const Header = () => {\n  return (\n    <header>Header Component</header>\n  );\n};'
            },
            { 
              id: 6, 
              name: 'Footer.tsx', 
              type: 'file',
              content: 'export const Footer = () => {\n  return (\n    <footer>Footer Component</footer>\n  );\n};'
            },
          ]
        },
      ]
    },
  ];

  const toggleFolder = (folderId: number) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      default:
        return 'plaintext';
    }
  };

  const renderFiles = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div 
          style={{ marginLeft: `${level * 20}px` }} 
          className={`py-1 px-2 flex items-center space-x-2 cursor-pointer rounded hover:bg-gray-700 ${
            selectedFile?.id === item.id ? 'bg-gray-700' : ''
          }`}
          onClick={() => item.type === 'folder' ? toggleFolder(item.id) : handleFileClick(item)}
        >
          {item.type === 'folder' && (
            expandedFolders.includes(item.id) ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )
          )}
          {item.type === 'folder' ? (
            <FolderTree size={18} className="text-indigo-400" />
          ) : (
            <FileText size={18} className="text-gray-400" />
          )}
          <span className="text-gray-300">{item.name}</span>
        </div>
        {item.type === 'folder' && expandedFolders.includes(item.id) && item.items && (
          <div>{renderFiles(item.items, level + 1)}</div>
        )}
      </div>
    ));
  };

  const TabButton = ({ tab, active, icon: Icon, children }: { tab: Tab, active: boolean, icon: any, children: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg ${
        active 
          ? 'bg-gray-800 text-white border-t-2 border-indigo-400' 
          : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      <Icon size={16} />
      <span>{children}</span>
    </button>
  );

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Steps Panel */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ListTodo className="h-6 w-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Build Steps</h2>
          </div>
          <div className="space-y-4 overflow-y-auto">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg ${
                  step.status === 'completed'
                    ? 'bg-green-900/20 text-green-400'
                    : step.status === 'in-progress'
                    ? 'bg-indigo-900/20 text-indigo-400'
                    : 'bg-gray-700/20 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{step.title}</span>
                  <span className="text-sm capitalize">{step.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* File Explorer */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FolderTree className="h-6 w-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">File Explorer</h2>
          </div>
          <div className="overflow-y-auto">
            {renderFiles(files)}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-1/2 flex flex-col overflow-hidden">
        {/* Prompt */}
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-white mb-2">Your Prompt</h3>
          <p className="text-gray-300 bg-gray-800 p-4 rounded-lg">{prompt}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 px-6 mt-6">
          <TabButton tab="code" active={activeTab === 'code'} icon={Code}>
            Code
          </TabButton>
          <TabButton tab="preview" active={activeTab === 'preview'} icon={Eye}>
            Preview
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 pt-0 overflow-hidden">
          {activeTab === 'code' ? (
            <div className="h-full bg-gray-800 rounded-b-lg rounded-tr-lg overflow-hidden">
              {selectedFile ? (
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={getLanguage(selectedFile.name)}
                  value={selectedFile.content}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Select a file to view its content
                </div>
              )}
            </div>
          ) : (
            <div className="h-full bg-gray-800 rounded-b-lg rounded-tr-lg p-4">
              <iframe
                src="about:blank"
                className="w-full h-full bg-white rounded"
                title="Preview"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;