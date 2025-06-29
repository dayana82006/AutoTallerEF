// collectFilesForClaudeMinified.js
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { extname, basename, relative, resolve, join } from 'path';
import { minify } from 'terser';

// Configuración
const CONFIG = {
  sourceDir: './autotaller-manager',
  outputFile: './project-for-ai-minified.json',
  excludedDirs: ['node_modules', 'dist', 'build', '.git', 'coverage', '.next', '.cache'],
  includedExtensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md', '.html', '.svg', '.config.js'],
  importantFiles: ['package.json', 'tsconfig.json', 'README.md']
};

async function main() {
  try {
    console.log('🚀 Iniciando compilación super-minificada del proyecto...');
    
    // Variable para almacenar todo el contenido
    let allContent = '';
    
    // Función recursiva para explorar directorios
    async function scanDir(dir) {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const itemPath = join(dir, item);
        const stats = statSync(itemPath);
        
        if (stats.isDirectory()) {
          if (!CONFIG.excludedDirs.includes(basename(itemPath))) {
            await scanDir(itemPath);
          }
        } else if (stats.isFile()) {
          const ext = extname(itemPath);
          if (CONFIG.includedExtensions.includes(ext) || 
              CONFIG.importantFiles.includes(basename(itemPath))) {
            
            // Procesar archivo
            try {
              const relativePath = relative(resolve(CONFIG.sourceDir), itemPath);
              const content = readFileSync(itemPath, 'utf8');
              const fileExt = extname(itemPath).toLowerCase();
              
              // Minificar JS/TS
              let processedContent = content;
              if (['.js', '.jsx', '.ts', '.tsx'].includes(fileExt)) {
                try {
                  const minified = await minify(content);
                  if (minified.code) processedContent = minified.code;
                } catch (e) {
                  // Si falla minificación, usar contenido original
                }
              }
              
              // Agregar al contenido concatenado
              allContent += `[${relativePath}]${processedContent}`;
            } catch (error) {
              console.error(`Error procesando ${itemPath}: ${error.message}`);
            }
          }
        }
      }
    }
    
    // Iniciar exploración
    await scanDir(resolve(CONFIG.sourceDir));
    console.log(resolve(CONFIG.sourceDir))
    // Crear objeto JSON con todo el contenido en una línea
    const projectData = {
      content: allContent,
      fileCount: allContent.split('[').length - 1,
      generatedAt: new Date().toISOString()
    };
    
    // Escribir resultado
    writeFileSync(CONFIG.outputFile, JSON.stringify(projectData), 'utf8');
    console.log(`✅ Proyecto super-minificado en: ${CONFIG.outputFile}`);
    console.log(`   Total archivos: ${projectData.fileCount}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();