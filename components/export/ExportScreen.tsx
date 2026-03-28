'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { downloadXlsx, getFileName } from '@/lib/export-xlsx'

export default function ExportScreen() {
  const [downloaded, setDownloaded] = useState(false)
  const setCurrentStep = useFormStore((s) => s.setCurrentStep)

  const handleDownload = () => {
    const state = useFormStore.getState()
    downloadXlsx(state)
    setDownloaded(true)
  }

  const fileName = getFileName(useFormStore.getState())

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 text-center"
    >
      <div className="space-y-3">
        {downloaded ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        ) : (
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sus/10">
            <svg className="h-10 w-10 text-sus" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}

        <h2 className="text-2xl font-bold text-foreground">
          {downloaded ? 'Download concluído!' : 'Avaliação completa!'}
        </h2>
        <p className="mx-auto max-w-md text-sm text-foreground/50">
          {downloaded
            ? `O arquivo "${fileName}" foi baixado com sucesso.`
            : 'Obrigado por participar da avaliação de usabilidade do Trello. Suas respostas são muito valiosas para nossa pesquisa.'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          type="button"
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl bg-sus px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-sus/90 hover:shadow-xl"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloaded ? 'Baixar novamente' : 'Baixar respostas (.xlsx)'}
        </motion.button>

        <button
          type="button"
          onClick={() => setCurrentStep(0)}
          className="text-sm text-foreground/40 hover:text-foreground/60"
        >
          Revisar respostas
        </button>
      </div>

      <div className="mx-auto max-w-sm rounded-lg bg-sus/5 px-4 py-3 text-xs text-foreground/40">
        Envie o arquivo <strong>{fileName}</strong> ao avaliador por e-mail ou WhatsApp.
      </div>
    </motion.div>
  )
}
