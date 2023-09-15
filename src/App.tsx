import { Textarea } from './components/ui/textarea'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Github, Wand2 } from 'lucide-react'
import {
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from './components/ui/select'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'
import { SelectTrigger } from '@radix-ui/react-select'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { useCompletion } from 'ai/react'
import { useState } from 'react'

const apiURL = import.meta.env.VITE_API_URL

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    setInput,
    input,
  } = useCompletion({
    api: `${apiURL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3 max-md:flex-col">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜
          </span>

          <Separator orientation="vertical" className="h-6 max-md:hidden" />

          <a
            className="flex items-center"
            href="https://github.com/Romeusorionaet"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="w-4 h-4 mr-2" /> Github
          </a>
        </div>
      </div>

      <main className="flex flex-1 gap-6 p-6 max-md:flex-col max-md:items-center">
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 flex flex-col">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá costomizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendema deixar mais criativo e com possíveis
                erros.
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading} className="w-full" type="submit">
              Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed max-md:h-60"
              placeholder="Inclua o prompt pela IA"
              onChange={handleInputChange}
              value={input}
            />
            <Textarea
              className="resize-none p-4 leading-relaxed max-md:h-60"
              placeholder="Resultado gerado pela IA"
              value={completion}
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground text-end">
            Lembre-se: você pode atualizar a variável
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar
          </p>
        </div>
      </main>
    </div>
  )
}
