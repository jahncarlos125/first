'use strict'
const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // Quantas execuções ao mesmo tempo
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskMail-job'
  }

  async handle ({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`)
    await Mail.send(
      ['emails.new_task'], {
        username,
        title,
        hasAttachment: !!file
      },
      message => {
        message
          .to(email)
          .from('jahncarlos.social@gmail.com', 'Jahn Carlos')
          .subject('Nova tarefa para você')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
