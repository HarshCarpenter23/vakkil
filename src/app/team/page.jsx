import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const teamData = {
  trailblazingLeadership: [
    { name: 'Dr. G VISHWANATHAN', role: 'Chancellor', image: '/images/VIT_FOUNDER.jpg'},
    { name: 'Dr.S.V. Kotta Reddy', role: 'Vice Chancellor', image: '/images/kotta-reddy.png' },
    { name: 'Dr.Jagadish Chandra Mudiganti', role: 'Registrar', image: '/images/registrar.png' },
    { name: 'Dr. Hari Seetha', role: '', image: '/images/hari-seetha.jpeg' },
    { name: 'Dr. Benarji Chakka', role: '', image: '/images/benarji.png' },
    { name: 'Dr. Sibi Chakkaravarthy S', role: '', image: '/images/sibi.png' },
    { name: 'Dr. Ameet Chavan', role: '', image: '/images/ameet.png' },
    { name: 'Dr. E. Ajith Jubilson', role: '', image: '/images/ajith.png' },
    { name: 'Dr. R. Nandha Kumar', role: '', image: '/images/nandha.png' },
    { name: 'Dr. S. Priyanka', role: '', image: '/images/priyanka.png' },
    { name: 'Dr. Sudhakar Ilango', role: '', image: '/images/sudhakar.png' },
    { name: 'Dr. D Sumathi', role: '', image: '/images/sumati.png' },
  ],
  studentLeadership: [
    { name: 'Ajay', role: '', image: '/images/ajay.jpg' },
    { name: 'Harsh Carpenter', role: '', image: '/images/harsh.jpg' },
    { name: 'Mithilesh', role: '', image: '/images/mithilesh.jpg' },
    { name: 'Arin', role: '', image: '/images/arin.jpg' },
    { name: 'Sahid Ahmed', role: '', image: '/images/sahid.jpg' },
    { name: 'Kashish', role: '', image: '/images/kashish.jpg' },
    { name: 'Sumit Sharma', role: '', image: '/images/sumit.jpg' },
    { name: 'Vikrant Malik', role: '', image: '/images/vikrant.jpg' },
    { name: 'Anvith S', role: '', image: '/images/anvith.jpg' },
    { name: 'Aditya Mitra', role: '', image: '/images/aditya.jpg' },
  ],
};

const TeamMember = ({ name, role, image }) => (
  <div className="flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg p-4 rounded-lg">
    <div className="w-32 h-32 relative rounded-full overflow-hidden">
      <Image 
        src={image} 
        alt={name} 
        layout="fill"
        className="object-cover transition-transform transform hover:scale-110"
      />
    </div>
    <strong className="mt-2 text-lg font-semibold">{name}</strong>
    {role && <div className="italic text-gray-600">{role}</div>}
  </div>
);

const TrailblazingLeadership = ({ members }) => (
  <div className="mb-8">
    <div className="grid grid-cols-3 gap-6 mb-6">
      {members.slice(0, 3).map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      {members.slice(3, 7).map((member, index) => (
        <TeamMember key={index + 3} {...member} />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {members.slice(7).map((member, index) => (
        <TeamMember key={index + 7} {...member} />
      ))}
    </div>
  </div>
);

const StudentLeadership = ({ members }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
    {members.map((member, index) => (
      <TeamMember key={index} {...member} />
    ))}
  </div>
);

const TeamPage = () => {
  return (
    <div className="p-10 font-roboto text-center bg-gradient-to-br from-[#507687] via-[#16325B] to-[#507687] text-[#ededed] min-h-screen">
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Meet our dedicated team members" />
      </Head>
      <h1 className="text-4xl font-extrabold mt-10 mb-14">Meet Our Team</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-8 pb-2 border-b-2 border-gray-300">Trailblazing Leadership</h2>
        <TrailblazingLeadership members={teamData.trailblazingLeadership} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-gray-300">Student Leadership</h2>
        <StudentLeadership members={teamData.studentLeadership} />
      </section>
    </div>
  );
};

export default TeamPage;
