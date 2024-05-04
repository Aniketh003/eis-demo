import './Contributors.css'
import Card from './Card'

export interface dataProps {
  name: string;
  img: string;
  role: string;
  links: {
    github: string;
    mail: string;
    linkedIn: string;
  };
}

const data: dataProps[] = [
  {
    name: "Busavale Dathrao",
    img: "Dathrao.jpg",
    role: "Frontend Developer",
    links: {
      github: "https://github.com/Aniketh003",
      mail: "anikethbusavale03@gmail.com",
      linkedIn: "https://www.linkedin.com/in/aniketh03"
    }
  }
  , {
    name: "Uday Kiran Damarla",
    img: "Uday.jpg",
    role: "Backend Developer",
    links: {
      github: "https://github.com/Dvs-uday",
      mail: "dvsuday@gmail.com",
      linkedIn: "https://www.linkedin.com/in/dvs-uday-kiran",
    }
  }
  , {
    name: "Maddela Pooja",
    img: "Pooja.jpg",
    role: "Frontend Developer",
    links: {
      github: "https://github.com/poojamaddela",
      mail: "poojamaddela70@gmail.com",
      linkedIn: "https://www.linkedin.com/in/maddela-pooja-026834299/",
    }
  }
  , {
    name: "Mithelesh Ghatti",
    img: "Mithelesh.png",
    role: "Backend Developer",
    links: {
      github: "",
      mail: "",
      linkedIn: "",
    }
  }
  , {
    name: "Bandaru Pallavi",
    img: "Pallavi.jpg",
    role: "Backend Developer",
    links: {
      github: "https://github.com/Pallavibandaru",
      mail: "bpallavi2004@gmail.com",
      linkedIn: "https://www.linkedin.com/in/pallavi-bandaru-aa32ba27a",
    }
  }
]

const ContributorsComponent = () => {
  return (
    <div className="contributors-component">
      <p className="hero-text">Contributors</p>
      <div className='contributors-container'>
        {data.map((contributor) => (
          <Card Contributor={contributor} key={contributor.links.mail} />
        ))}
      </div>
    </div>
  )
}

export default ContributorsComponent
