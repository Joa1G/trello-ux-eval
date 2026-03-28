'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { downloadXlsx, getFileName } from '@/lib/export-xlsx'

export default function ExportScreen() {
  const [downloaded, setDownloaded] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const setCurrentStep = useFormStore((s) => s.setCurrentStep)
  const reset = useFormStore((s) => s.reset)

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

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="text-sm text-red-400 hover:text-red-500"
        >
          Preencher novamente (novo participante)
        </button>
      </div>

      <div className="mx-auto max-w-sm rounded-lg bg-sus/5 px-4 py-3 text-xs text-foreground/40">
        Envie o arquivo <strong>{fileName}</strong> ao avaliador por e-mail ou WhatsApp.
      </div>

      {/* Modal de confirmação */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Preencher novamente?
            </h3>
            <p className="mt-2 text-sm text-foreground/60">
              Todas as respostas atuais serão apagadas. Certifique-se de que já
              baixou o arquivo .xlsx antes de continuar.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/60 hover:bg-foreground/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  reset()
                  setShowResetModal(false)
                  setDownloaded(false)
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Sim, recomeçar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
