import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>

            {/* Logo */}
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Coder's
              </span>
              Consortium
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            {/* About */}
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Home
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Coder's Consortium
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Follow us */}
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/TheMikeKaisen'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link 
                    href='https://www.linkedin.com/in/karthik-h-nair'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Linked In
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Legal */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Coder's Consortium"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} target='_blank'/>
            <Footer.Icon href='#' icon={BsInstagram} target='_blank'/>
            <Footer.Icon href='#' icon={BsTwitter} target='_blank'/>
            <Footer.Icon href='https://github.com/TheMikeKaisen' icon={BsGithub} target='_blank'/>
            <Footer.Icon href='https://www.linkedin.com/in/karthik-h-nair'icon={BsLinkedin} target='_blank'/>

          </div>
        </div>
      </div>
    </Footer>
  );
}